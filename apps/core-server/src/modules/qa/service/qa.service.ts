// ** Nest Imports
import { HttpException, Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import { Between, DataSource, LessThan } from 'typeorm';
import QaRepository from '../repository/qa.repository';
import FileRepository from '../repository/qa.file.repository';
import UserRepository from '@/src/modules/user/repository/user.repository';
import WorkspaceUserRepository from '../../workspace/repository/workspace-user.repository';

// ** enum, dto, entity, types Imports
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@repo/common';
import RequestQaSaveDto from '../dto/qa.save.dto';
import RequestQaUpdateDto from '../dto/qa.update.dto';
import RequestQaStatusUpdateDto from '../dto/qa.status.update.dto';
import RequestQaFindDto from '../dto/qa.find.dto';
import Qa from '@/src/modules/qa/domain/qa.entity';
import User from '../../user/domain/user.entity';
import Workspace from '../../workspace/domain/workspace.entity';
import RequestSimpleQaSaveDto from '../dto/qa-simple.save';
import RequestQaUserUpdateDto from '../dto/qa.user.update.dto';
import RequestQaFileSaveDto from '../dto/qa-file.save.dto';
import RequestQaDueDateUpdateDto from '../dto/qa.duedate.update.dto';
import RequestQaSimpleUpdateDto from '../dto/qa-simple.update.dto';
import { TaskStatusEnum } from '@repo/common';
import RequestWorkspaceTaskFindDto from '../../workspace/dto/workspace-task.find.dto';

@Injectable()
export default class QaService {
  constructor(
    private readonly qaRepository: QaRepository,
    private readonly fileRepository: FileRepository,
    private readonly userRepository: UserRepository,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger(QaService.name);

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
    const qaCount =
      (await this.qaRepository.count({
        where: { workspace: { id: workspace.id } },
      })) + 1;
    const qaNumber = workspace.code + '-' + qaCount;

    await this.qaRepository.save(
      this.qaRepository.create({
        code: qaNumber,
        title: dto.title,
        asIs: '',
        toBe: '',
        worker: admin,
        orderId: qaCount,
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
   * Find My Qa List
   * @param workerId
   * @returns
   */
  public async findQaListByWorkerId(workerId: number) {
    return await this.qaRepository.findQaListByWorkerId(workerId);
  }

  /**
   * Save Qa File
   * @param qa
   * @param dto
   */
  public async saveQaFile(qa: Qa, dto: RequestQaFileSaveDto) {
    await this.fileRepository.save(
      this.fileRepository.create({
        url: dto.url,
        qa,
      }),
    );
  }

  /**
   * Find Qa List By Date
   * @param workspaceId
   * @param userId
   * @param dto
   * @returns
   */
  public async findQaListByDate(
    workspaceId: number,
    userId: number,
    dto: RequestWorkspaceTaskFindDto,
  ) {
    return await this.qaRepository.findQaListByDate(workspaceId, userId, dto);
  }

  /**
   * Delete Qa File By Id
   * @param qaFileId
   */
  public async deleteQaFile(qaFileId: number) {
    await this.fileRepository.delete(qaFileId);
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
      const qaCount =
        (await this.qaRepository.count({
          where: { workspace: { id: workspace.id } },
        })) + 1;
      const qaNumber = workspace.code + '-' + qaCount;

      await queryRunner.manager.save(
        this.qaRepository.create({
          code: qaNumber,
          title: dto.title,
          asIs: dto.asIs,
          toBe: dto.toBe,
          memo: dto.memo,
          dueDate: dto.dueDate,
          admin: admin,
          worker: findWorker,
          qaFile: files,
          workspace: workspace,
          orderId: qaCount,
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
  }

  /**
   * QA 카운트 조회
   * @param workspaceId
   * @returns
   */
  public async findQaCount(workspaceId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const qaCount = await this.qaRepository.count({
      where: { workspace: { id: workspaceId }, dueDate: LessThan(today) },
    });

    const oneDayAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    const yesterDayQaCount = await this.qaRepository.count({
      where: { workspace: { id: workspaceId }, dueDate: LessThan(oneDayAgo) },
    });

    return { qaCount, yesterDayQaCount };
  }

  /**
   * 전체 QA 카운트 조회
   * @param workspaceId
   * @returns
   */
  public async findQaCountAll(workspaceId: number) {
    const qaCount = await this.qaRepository.count({
      where: { workspace: { id: workspaceId } },
    });

    const qaCompleteCount = await this.qaRepository.count({
      where: {
        workspace: { id: workspaceId },
        status: TaskStatusEnum.COMPLETE,
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterDayQaCount = await this.qaRepository.count({
      where: { workspace: { id: workspaceId }, createdDate: LessThan(today) },
    });

    const yesterDayQaCompleteCount = await this.qaRepository.count({
      where: {
        workspace: { id: workspaceId },
        status: TaskStatusEnum.COMPLETE,
        completeDate: LessThan(today),
      },
    });

    return {
      qaCount,
      qaCompleteCount,
      yesterDayQaCount,
      yesterDayQaCompleteCount,
    };
  }

  /**
   * QA 카운트 조회
   * @param workspaceId
   * @returns
   */
  public async findQaDoneCount(workspaceId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const qaCount = await this.qaRepository.count({
      where: {
        workspace: { id: workspaceId },
        status: TaskStatusEnum.COMPLETE,
      },
    });

    const yesterDayQaCount = await this.qaRepository.count({
      where: {
        workspace: { id: workspaceId },
        completeDate: LessThan(today),
        status: TaskStatusEnum.COMPLETE,
      },
    });

    return { qaCount, yesterDayQaCount };
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

    if (findQa.status === TaskStatusEnum.COMPLETE) {
      if (dto.status === TaskStatusEnum.COMPLETE) {
        findQa.completeDate = new Date();
      } else {
        findQa.completeDate = null;
      }
    }

    findQa.status = dto.status;

    await this.qaRepository.save(findQa);
  }

  public async updateQaDueDate(
    dto: RequestQaDueDateUpdateDto,
    workspace: Workspace,
  ) {
    const findQa = await this.findQa(dto.qaId, workspace.id);

    findQa.dueDate = new Date(dto.dueDate);
    await this.qaRepository.save(findQa);
  }
  /**
   * Delete Qa
   * @param qaId
   * @param workspace
   */
  public async deleteQa(qaId: number, workspace: Workspace) {
    const findQa = await this.findQa(qaId, workspace.id);
    findQa.isDeleted = true;
    await this.qaRepository.save(findQa);
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
   * QA를 업데이트 합니다.
   * @param qa
   * @param dto
   */
  public async updateQaSimple(qa: Qa, dto: RequestQaSimpleUpdateDto) {
    if (dto.type === 'title') {
      qa.title = dto.value;
    } else if (dto.type === 'asIs') {
      qa.asIs = dto.value;
    } else if (dto.type === 'toBe') {
      qa.toBe = dto.value;
    } else if (dto.type === 'memo') {
      qa.memo = dto.value;
    }

    await this.qaRepository.save(qa);
  }

  /**
   * Find Qa by Id
   * @param qaId
   */
  public async findQaByIdWithWorkerAndAdmin(qaId: number) {
    const findQa = await this.qaRepository.findOne({
      where: { id: qaId, isDeleted: false },
      relations: ['worker', 'admin'],
    });

    if (!findQa) {
      throw new NotFoundException('Not Found Qa');
    }

    return findQa;
  }

  /**
   * Find Qa by Id
   * @param qaId
   */
  public async findQaById(qaId: number) {
    const findQa = await this.qaRepository.findOne({
      where: { id: qaId, isDeleted: false },
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

  /**
   * Existed Qa By Id
   * @param qaId
   */
  public async isExistedFileById(fileId: number) {
    const findQa = await this.fileRepository.exist({
      where: { id: fileId },
    });

    if (!findQa) {
      throw new NotFoundException('Not Found File');
    }
  }

  /**
   * Update Qa Order
   * @param qa
   * @param targetOrderId
   * @param workspaceId
   */
  public async updateQaOrder(
    qa: Qa,
    targetOrderId: number,
    workspaceId: number,
  ) {
    if (qa.orderId > targetOrderId) {
      const list = await this.findMoreQaList(
        qa.orderId,
        targetOrderId,
        workspaceId,
      );

      await this.updateOrder(list, true, qa, targetOrderId);
    }

    if (qa.orderId < targetOrderId) {
      const list = await this.findLessQaList(
        qa.orderId,
        targetOrderId,
        workspaceId,
      );

      await this.updateOrder(list, false, qa, targetOrderId);
    }
  }

  /**
   * Qa Update Order
   * @param epicList
   * @param isPluse
   * @param targetEpic
   * @param targetOrderId
   */
  private async updateOrder(
    epicList: Qa[],
    isPluse: boolean,
    targetEpic: Qa,
    targetOrderId: number,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for await (const item of epicList) {
        isPluse
          ? (item.orderId = item.orderId + 1)
          : (item.orderId = item.orderId - 1);

        await queryRunner.manager.save(item);
      }
      targetEpic.orderId = targetOrderId;
      queryRunner.manager.save(targetEpic);

      queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  /**
   * Find More Qa List
   * @param orderId
   * @param workspaceId
   * @returns
   */
  public async findLessQaList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ) {
    return await this.qaRepository.find({
      where: {
        orderId: Between(orderId, targetOrderId),
        workspace: { id: workspaceId },
      },
    });
  }

  /**
   * Find Less Qa List
   * @param orderId
   * @param workspaceId
   * @returns
   */
  public async findMoreQaList(
    orderId: number,
    targetOrderId: number,
    workspaceId: number,
  ) {
    return await this.qaRepository.find({
      where: {
        orderId: Between(targetOrderId, orderId),
        workspace: { id: workspaceId },
      },
    });
  }
}
