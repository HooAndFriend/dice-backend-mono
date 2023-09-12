// ** Nest Imports
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

// ** Custom Module Imports
import WorkspaceRepository from '../repository/workspace.repository';

// ** enum, dto, entity, types Imports

import { BadRequestException } from 'src/exception/customException';
import User from 'src/api/user/domain/user.entity';
import { DataSource } from 'typeorm';
import CommonResponse from 'src/common/dto/api.response';
import WorkspaceUserRepository from 'src/api/workspace-user/repository/workspace-user.repository';
import RequestWorksapceSaveDto from '../dto/workspace.save.dto';
import { WorkspaceRoleType } from 'src/enums/WorkspaceRoleType.enum';

// Other Imports

@Injectable()
export default class WorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly configService: ConfigService,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  public async saveWorksapce(dto: RequestWorksapceSaveDto, user: User) {
    const findWorkspace = await this.workspaceRepository.findOne({
      where: { name: dto.name },
    });

    if (findWorkspace) {
      throw new BadRequestException('같은 이름의 워크스페이스가 있습니다.');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.commitTransaction();

      const saveWorkspace = await queryRunner.manager.save(
        this.workspaceRepository.create({
          name: dto.name,
          comment: dto.comment,
        }),
      );

      await queryRunner.manager.save(
        this.workspaceUserRepository.create({
          role: WorkspaceRoleType.ADMIN,
          workspace: saveWorkspace,
          user,
        }),
      );

      return CommonResponse.of({
        statusCode: 200,
        message: '워크스페이스를 생성합니다.',
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
