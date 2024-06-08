// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';

// ** Custom Module Imports
import WorkspaceUserRepository from '../repository/workspace-user.repository';
import WorkspaceRepository from '../repository/workspace.repository';

// ** Utils Imports
import { v4 as uuidv4 } from 'uuid';
import { createCode } from '@/src/global/util/generator/code.generate';

// ** Exception Imports
import { NotFoundException } from '@hi-dice/common';

// ** enum, dto, entity, types Imports
import RequestWorksapceSaveDto from '../dto/workspace.save.dto';
import RequestWorkspaceUpdateDto from '../dto/workspace.update.dto';
import { RoleEnum } from '@hi-dice/common';
import User from '../../user/domain/user.entity';
import { ConfigService } from '@nestjs/config';
import WorkspaceFunctionRepository from '../repository/workspace-function.repository';
import WorkspaceFunctionService from './workspace-function.service';
import WorkspaceUserService from './workspace-user.service';
import { JwtPayload } from '@/src/global/types';

@Injectable()
export default class WorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    private readonly workspaceUserService: WorkspaceUserService,
    private readonly workspaceFunctionService: WorkspaceFunctionService,
    private readonly configService: ConfigService,
  ) {}

  private logger = new Logger(WorkspaceService.name);

  /**
   * 워크스페이스 생성
   * @param dto
   * @param user
   * @returns
   */
  public async saveWorkspace(dto: RequestWorksapceSaveDto, user: User) {
    const workspace = this.workspaceRepository.create({
      name: dto.name,
      comment: dto.comment,
      profile: dto.profile,
      uuid: uuidv4(),
      code: createCode(dto.name),
      createdId: user.email,
      workspaceUser: [
        this.workspaceUserRepository.create({
          user,
          role: RoleEnum.ADMIN,
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

  /**
   * 워크스페이스 초기 생성
   * @param user
   */
  public async saveInitSaveWorkspace(user: User) {
    const workspace = await this.workspaceRepository.save(
      this.workspaceRepository.create({
        name: user.nickname,
        profile: this.configService.get('DEFAULT_PROFILE_VALUE'),
        comment: '',
        createdId: user.email,
        code: createCode(user.nickname),
        isPersonal: true,
        uuid: uuidv4(),
      }),
    );

    const functionList =
      await this.workspaceFunctionService.saveWorkspaceInitFunction(workspace);
    await this.workspaceUserService.saveInitWorkspaceUser(workspace, user);

    return { workspace, functionList };
  }

  /**
   *
   * @param userId
   * @returns
   */
  public async findPersonalWorkspaceList(userEmail: string) {
    return await this.workspaceRepository.findPersonalWorkspaceList(userEmail);
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

  /**
   * 워크스페이스를 UUID로 조회
   * @param uuid
   * @returns workspace
   */
  public async findWorkspaceByUuid(uuid: string) {
    return await this.workspaceRepository.findOne({ where: { uuid } });
  }

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
