// ** Nest Imports
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import WorkspaceUserRepository from '../repository/workspace-user.repository';
import WorkspaceRepository from '../repository/workspace.repository';
import WorkspaceUserService from './workspace-user.service';

// ** Utils Imports
import { v4 as uuidv4 } from 'uuid';
import { createCode } from '@/src/global/util/generator/code.generate';

// ** Exception Imports
import {
  BadRequestException,
  NotFoundException,
} from '@/src/global/exception/CustomException';

// ** enum, dto, entity, types Imports
import RequestWorksapceSaveDto from '../dto/workspace.save.dto';
import RequestWorkspaceUpdateDto from '../dto/workspace.update.dto';
import { RoleEnum } from '@hi-dice/common';
import User from '../../user/domain/user.entity';
import Workspace from '../domain/workspace.entity';

@Injectable()
export default class WorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    private readonly workspaceUserService: WorkspaceUserService,
    private readonly configService: ConfigService,
  ) {}

  private logger = new Logger(WorkspaceService.name);

  /**
   * 워크스페이스 삭제 처리
   */
  public async deleteWorkspace(workspace: Workspace): Promise<void> {
    this.validationDeleteWorkspace(workspace);

    workspace.toDelete();
    this.workspaceRepository.save(workspace);
  }

  /**
   * 워크스페이스 생성
   */
  public async saveWorkspace(
    dto: RequestWorksapceSaveDto,
    user: User,
  ): Promise<Workspace> {
    const workspace = this.workspaceRepository.create({
      name: dto.name,
      comment: dto.comment,
      profile: dto.profile,
      uuid: uuidv4(),
      code: createCode(dto.name),
      createdId: user.email,
      isPersonal: false,
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
   * 워크스페이스 수정
   */
  public async updateWorkspace(
    dto: RequestWorkspaceUpdateDto,
    id: number,
  ): Promise<void> {
    await this.workspaceRepository.update(id, {
      name: dto.name,
      profile: dto.profile,
      comment: dto.comment,
    });
  }

  /**
   * 워크스페이스 조회
   */
  public async findWorkspace(workspaceId: number): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findWorkspace(workspaceId);

    if (!workspace) {
      throw new NotFoundException('Not Found Workspace');
    }

    return workspace;
  }

  /**
   * 워크스페이스 정보 조회
   */
  public async findMainWorkspace(workspaceId: number): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findMainWorkspace(
      workspaceId,
    );

    if (!workspace) {
      throw new NotFoundException('Not Found Workspace');
    }

    return workspace;
  }

  /**
   * 워크스페이스 리스트와 유저 카운트 조회
   */
  public async findWorkspaceListWithCount(
    teamId: number,
  ): Promise<Workspace[]> {
    return await this.findTeamWorkspaceListWithCount(teamId);
  }

  /**
   * 워크스페이스 초기 생성
   */
  public async saveInitSaveWorkspace(user: User): Promise<Workspace> {
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

    await this.workspaceUserService.saveInitWorkspaceUser(workspace, user);

    return workspace;
  }

  /**
   * 개인 워크스페이스 리스트 조회
   */
  public async findPersonalWorkspaceList(
    userEmail: string,
  ): Promise<Workspace[]> {
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
   */
  public async findWorkspaceByUuid(uuid: string): Promise<Workspace> {
    return await this.workspaceRepository.findOne({ where: { uuid } });
  }

  /**
   * 워크스페이스 개수 및 유저 수 조회
   */
  public async findWorkspaceCountAndUserCount(
    teamId: number,
  ): Promise<{ workspaceCount: number; workspaceUserCount: number }> {
    return await this.workspaceRepository.findWorkspaceCountAndMemberCount(
      teamId,
    );
  }

  /**
   * 팀의 워크스페이스 리스트 조회
   */
  private async findTeamWorkspaceListWithCount(
    teamId: number,
  ): Promise<Workspace[]> {
    return await this.workspaceRepository.findTeamWorkspaceListWithCount(
      teamId,
    );
  }

  /**
   * 워크스페이스 삭제 전 유효성 검사
   */
  private validationDeleteWorkspace(workspace: Workspace): void {
    if (workspace.isPersonal) {
      throw new BadRequestException('Cannot delete personal workspace');
    }
  }
}
