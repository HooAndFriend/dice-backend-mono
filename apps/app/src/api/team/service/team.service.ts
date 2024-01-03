// ** Nest Imports
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import TeamRepository from '../repository/team.repository';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';
import WorkspaceUserRepository from '../../workspace-user/repository/workspace-user.repository';

// ** enum, dto, entity Imports
import User from '../../user/domain/user.entity';
import { BadRequestException } from '@/src/exception/CustomException';
import RequestTeamSaveDto from '../dto/team.save.dto';
import TeamUserRepository from '../../team-user/repository/team-user.repository';
import Role from '@/src/common/enum/Role';
import CommonResponse from '@/src/common/dto/api.response';

@Injectable()
export default class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly teamUserRepository: TeamUserRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Save Team
   * @param user
   * @param dto
   * @returns
   */
  public async saveTeam(user: User, dto: RequestTeamSaveDto) {
    const findTeam = await this.teamRepository.exist({
      where: { name: dto.name },
    });

    if (findTeam) {
      throw new BadRequestException('이미 같은 이름의 팀이 존재합니다.');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const team = await queryRunner.manager.save(
        this.teamRepository.create({
          name: dto.name,
          profile: dto.profile,
          description: dto.description,
        }),
      );

      const teamUser = await queryRunner.manager.save(
        this.teamUserRepository.create({
          user,
          team,
          role: Role.ADMIN,
        }),
      );

      const workspace = await queryRunner.manager.save(
        this.workspaceRepository.create({
          name: dto.name,
          profile: dto.profile,
          comment: dto.description,
          team,
        }),
      );

      await queryRunner.manager.save(
        this.workspaceUserRepository.create({
          workspace,
          teamUser,
          role: Role.ADMIN,
        }),
      );

      await queryRunner.commitTransaction();

      return CommonResponse.createResponseMessage({
        statusCode: 200,
        message: '팀을 생성합니다.',
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }
}
