// ** Nest Imports
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports
import WorkspaceRepository from '../repository/workspace.repository';

// ** enum, dto, entity, types Imports

import {
  BadRequestException,
  NotFoundException,
} from 'src/exception/customException';
import User from 'src/api/user/domain/user.entity';
import { DataSource } from 'typeorm';
import CommonResponse from 'src/common/dto/api.response';
import WorkspaceUserRepository from 'src/api/workspace-user/repository/workspace-user.repository';
import RequestWorksapceSaveDto from '../dto/workspace.save.dto';
import { WorkspaceRoleType } from 'src/common/enum/WorkspaceRoleType.enum';
import RequestWorkspaceUpdateDto from '../dto/workspace.update.dto';

// Other Imports

@Injectable()
export default class WorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly configService: ConfigService,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  private logger = new Logger();

  public async saveWorksapce(dto: RequestWorksapceSaveDto, user: User) {
    const findWorkspace = await this.workspaceRepository.findOne({
      where: { name: dto.name },
    });

    if (findWorkspace) {
      return CommonResponse.createBadRequestException(
        '같은 이름의 워크스페이스가 있습니다.',
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saveWorkspace = await queryRunner.manager.save(
        this.workspaceRepository.create({
          name: dto.name,
          comment: dto.comment,
          isPersonal: false,
        }),
      );

      await queryRunner.manager.save(
        this.workspaceUserRepository.create({
          role: WorkspaceRoleType.ADMIN,
          workspace: saveWorkspace,
          user,
        }),
      );

      await queryRunner.commitTransaction();

      return CommonResponse.createResponseMessage({
        statusCode: 200,
        message: '워크스페이스를 생성합니다.',
      });
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }

  public async updateWorkspace(dto: RequestWorkspaceUpdateDto) {
    const findWorkspace = await this.workspaceRepository.findOne({
      where: { id: dto.id },
    });

    if (!findWorkspace) {
      throw new NotFoundException('워크스페이스를 찾을 수 없습니다.');
    }

    await this.workspaceRepository.update(dto.id, {
      name: dto.name,
      profile: dto.profile,
      comment: dto.comment,
    });

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '워크스페이스를 수정합니다.',
    });
  }

  public async findWorkspace(workspaceId: number) {
    const findWorkspace = await this.workspaceRepository.findWorkspace(
      workspaceId,
    );

    if (!findWorkspace) {
      throw new NotFoundException('워크스페이스를 찾을 수 없습니다.');
    }

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '워크스페이스 정보를 조회합니다.',
      data: findWorkspace,
    });
  }
}
