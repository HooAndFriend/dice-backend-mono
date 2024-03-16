// ** Nest Imports
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import TeamRepository from '../repository/team.repository';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';
import WorkspaceUserRepository from '../../workspace-user/repository/workspace-user.repository';

// ** Utils Imports
import { v4 as uuidv4 } from 'uuid';

// ** enum, dto, entity Imports
import User from '../../user/domain/user.entity';
import RequestTeamSaveDto from '../dto/team.save.dto';
import TeamUserRepository from '../../team-user/repository/team-user.repository';
import Role from '@/src/global/enum/Role';
import RequestTeamUpdateDto from '../dto/team.update.dto';

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
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const team = await queryRunner.manager.save(
        this.teamRepository.create({
          name: dto.name,
          profile: dto.profile,
          description: dto.description,
          isPersonal: false,
          createdId: user.email,
          uuid: uuidv4(),
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
          uuid: uuidv4(),
          createdId: user.email,
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
    } catch (error) {
      console.log(error);
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
   * Update Team
   * @param teamId
   * @param dto
   */
  public async updateTeam(teamId: number, dto: RequestTeamUpdateDto) {
    await this.teamRepository.update(teamId, {
      ...dto,
    });
  }

  /**
   * Find Team Info
   * @param teamId
   * @returns
   */
  public async findTeam(teamId: number) {
    const team = await this.teamRepository.findTeam(teamId);

    if (!team) {
      throw new NotFoundException('Not Found Team');
    }

    return team;
  }
}
