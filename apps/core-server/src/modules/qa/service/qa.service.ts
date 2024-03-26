// ** Nest Imports
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '../../../global/exception/CustomException';
import { DataSource } from 'typeorm';
import QaRepository from '../repository/qa.repository';
import FileRepository from '../repository/file.repository';
import UserRepository from '@/src/modules/user/repository/user.repository';
import WorkspaceRepository from '@/src/modules/workspace/repository/workspace.repository';
import WorkspaceUserRepository from '../../workspace-user/repository/workspace-user.repository';

// ** Response Imports

// ** enum, dto, entity, types Imports
import RequestQaSaveDto from '../dto/qa.save.dto';
import RequestQaUpdateDto from '../dto/qa.update.dto';
import RequestQaStatusUpdateDto from '../dto/qa.status.update.dto';
import RequestQaFindDto from '../dto/qa.find.dto';
import Qa from '@/src/modules/qa/domain/qa.entity';
import User from '../../user/domain/user.entity';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestSimpleQaSaveDto from '../dto/qa-simple.save';
import RequestQaUserUpdateDto from '../dto/qa.user.update.dto';

@Injectable()
export default class QaService {
  constructor(
    private readonly qaRepository: QaRepository,
    private readonly fileRepository: FileRepository,
    private readonly userRepository: UserRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  /**
   * Save Simple Qa
   * @param dto
   * @param admin
   * @param workspace
   */
  public async saveSimpleQa(
    dto: RequestSimpleQaSaveDto,
    admin: User,
    workspace: Workspace,
  ) {
    await this.qaRepository.save(
      this.qaRepository.create({
        number: dto.number,
        title: dto.title,
        asIs: '',
        toBe: '',
        worker: admin,
        admin,
        workspace,
      }),
    );
  }
  /**
   * Find Qa List
   * @param workspace
   * @param findQuery
   */
  public async findQaList(workspace: Workspace, findQuery: RequestQaFindDto) {
    const [data, count] = await this.qaRepository.findQaList(
      workspace.id,
      findQuery,
    );
    return { data, count };
  }
  /**
   * Save Qa
   * @param dto
   * @param admin
   * @param workspace
   */
  public async saveQa(
    dto: RequestQaSaveDto,
    admin: User,
    workspace: Workspace,
  ) {
    const findWorker = await this.findQaUser(dto.workerId, workspace.id);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const files = await queryRunner.manager.save(
        dto.fileurls.map((fileURL) =>
          this.fileRepository.create({
            url: fileURL.url,
          }),
        ),
      );
      const qaCount = await this.qaRepository.count({
        where: {workspace: {id: workspace.id}}
      }) + 1;
      const qaNumber = workspace.code + "-" + qaCount;

      await queryRunner.manager.save(
        this.qaRepository.create({
          number: qaNumber,
          title: dto.title,
          asIs: dto.asIs,
          toBe: dto.toBe,
          memo: dto.memo,
          admin: admin,
          worker: findWorker,
          file: files,
          workspace: workspace,
        }),
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.log(error);
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
    return;
  }
  /**
   * Update Qa
   * @param dto
   * @param workspace
   */
  public async updateQa(dto: RequestQaUpdateDto, workspace: Workspace) {
    const findQa = await this.findQa(dto.qaId, workspace.id);
    const findWorker = await this.findQaUser(dto.workerId, workspace.id);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const files = await queryRunner.manager.save(
        dto.fileurls.map((fileURL) =>
          this.fileRepository.create({
            url: fileURL.url,
          }),
        ),
      );

      findQa.updateQaFromDto(dto, findWorker, files);

      await queryRunner.manager.save(Qa, findQa);

      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.log(error);
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
    return;
  }
  /**
   * Update Qa Status
   * @param dto
   * @param workspace
   */
  public async updateQaStatus(
    dto: RequestQaStatusUpdateDto,
    workspace: Workspace,
  ) {
    const findQa = await this.findQa(dto.qaId, workspace.id);

    findQa.status = dto.status;
    await this.qaRepository.save(findQa);

    return;
  }
  public async deleteQa(qaId: number, workspace: Workspace) {
    const findQa = await this.findQa(qaId, workspace.id);
    findQa.isDeleted = true;
    await this.qaRepository.save(findQa);
    return;
  }

  /**
   * Find Qa by Id
   * @param qaId
   * @param workspaceId
   */
  public async findQa(qaId: number, workspaceId: number) {
    const findQa = await this.qaRepository.findOne({
      where: { id: qaId, workspace: { id: workspaceId }, isDeleted: false },
    });

    if (!findQa) {
      throw new NotFoundException('Not Found Qa');
    }

    return findQa;
  }

  /**
   * Find Qa by Id
   * @param qaId
   * @param workspaceId
   */
  public async findQaWithFileAndWorkerAndAdmin(qaId: number) {
    const findQa = await this.qaRepository.findQaById(qaId);

    if (!findQa) {
      throw new NotFoundException('Not Found Qa');
    }

    return findQa;
  }

  /**
   * Find a Qa User
   * @param userId
   * @param workspaceId
   */
  public async findQaUser(userId: number, workspaceId: number) {
    const findWorker = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!findWorker) {
      throw new NotFoundException('Not Found User');
    }

    const findworkspaceUser = await this.workspaceUserRepository.findOne({
      where: {
        workspace: { id: workspaceId },
        teamUser: { user: { id: userId } },
      },
    });
    if (!findworkspaceUser) {
      throw new BadRequestException('User is not in the workspace');
    }

    return findWorker;
  }

  /**
   * Update User Qa
   * @param dto
   * @param user
   */
  public async updateUserQa(dto: RequestQaUserUpdateDto, user: User) {
    if (dto.type === 'admin') {
      await this.qaRepository.update(dto.qaId, { admin: user });
    } else {
      await this.qaRepository.update(dto.qaId, { worker: user });
    }
  }

  /**
   * Existed Qa By Id
   * @param qaId
   */
  public async isExistedQaById(qaId: number) {
    const findQa = await this.qaRepository.exist({
      where: { id: qaId },
    });

    if (!findQa) {
      throw new NotFoundException('Not Found Qa');
    }
  }
}
