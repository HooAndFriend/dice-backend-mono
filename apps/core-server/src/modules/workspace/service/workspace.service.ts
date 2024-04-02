// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Typeorm Imports
import { DataSource } from 'typeorm';

// ** Custom Module Imports
import WorkspaceUserRepository from '../../workspace-user/repository/workspace-user.repository';
import WorkspaceRepository from '../repository/workspace.repository';

// ** Utils Imports
import { v4 as uuidv4 } from 'uuid';
import { createCode } from '@/src/global/util/generator/code.generate';

// ** Exception Imports
import { NotFoundException } from '@/src/global/exception/CustomException';

// ** enum, dto, entity, types Imports
import RequestWorksapceSaveDto from '../dto/workspace.save.dto';
import RequestWorkspaceUpdateDto from '../dto/workspace.update.dto';
import Role from '@/src/global/enum/Role';
import TeamUser from '../../team/domain/team-user.entity';

@Injectable()
export default class WorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
  ) {}

  private logger = new Logger(WorkspaceService.name);

  /**
   * 워크스페이스 생성
   * @param dto
   * @param user
   * @returns
   */
  public async saveTeamWorksapce(
    dto: RequestWorksapceSaveDto,
    teamUser: TeamUser,
  ) {
    const workspace = this.workspaceRepository.create({
      name: dto.name,
      comment: dto.comment,
      profile: dto.profile,
      uuid: uuidv4(),
      code: createCode(dto.name),
      team: teamUser.team,
      createdId: teamUser.user.email,
      workspaceUser: [
        this.workspaceUserRepository.create({
          teamUser,
          role: Role.ADMIN,
        }),
      ],
    });

    return await this.workspaceRepository.save(workspace);
  }

  /**
   * Update Workspace
   * @param dto
   * @param id
   * @returns
   */
  public async updateWorkspace(dto: RequestWorkspaceUpdateDto, id: number) {
    return await this.workspaceRepository.update(id, {
      name: dto.name,
      profile: dto.profile,
      comment: dto.comment,
    });
  }

  /**
   * Find Workspace
   * @param workspaceId
   * @returns
   */
  public async findWorkspace(workspaceId: number) {
    const workspace = await this.workspaceRepository.findWorkspace(workspaceId);

    if (!workspace) {
      throw new NotFoundException('Not Found Workspace');
    }

    return workspace;
  }

  /**
   * Find Workspace Main
   * @param workspaceId
   * @returns
   */
  public async findMainWorkspace(workspaceId: number) {
    const workspace = await this.workspaceRepository.findMainWorkspace(
      workspaceId,
    );

    if (!workspace) {
      throw new NotFoundException('Not Found Workspace');
    }

    return workspace;
  }

  /**
   * Find Workspace List With User Count
   * @param user
   * @param teamId
   * @returns
   */
  public async findWorkspaceListWithCount(teamId: number) {
    return await this.findTeamWorkspaceListWithCount(teamId);
  }

  //   /**
  //  * Find My Ticket By Status
  //  * @param userId
  //  * @param status
  //  * @returns
  //  */
  //   public async findMyTicketByStatus(userId: number, status: TicketStatus) {
  //     return await this.workspaceRepository.find({
  //       where: { worker: { id: userId }, status },
  //     });
  //   }

  public async findWorkspaceCountAndUserCount(teamId: number) {
    const data =
      await this.workspaceRepository.findWorkspaceCountAndMemberCount(teamId);

    return data;
  }

  public async findWorkspaceTicketCount(teamId: number, userId: number) {
    return await this.workspaceRepository.findWorkspaceTicketCount(
      teamId,
      userId,
    );
  }

  /**
   * Find Workspace List at Team With User Count
   * @param teamId
   * @returns
   */
  private async findTeamWorkspaceListWithCount(teamId: number) {
    return await this.workspaceRepository.findTeamWorkspaceListWithCount(
      teamId,
    );
  }
}
