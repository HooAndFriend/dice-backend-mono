// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import WorkspaceRepository from '../repository/workspace.repository';
import RequestWorkspaceFindDto from '../dto/workspace.find.dto';

// ** Custom Module Imports

@Injectable()
export default class WorkspaceService {
  constructor(
    private readonly configService: ConfigService,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  /**
   * Find Workspace List By Team Id
   * @param teamId
   * @returns
   */
  public async findWorksapceListByTeamId(teamId: number) {
    return await this.workspaceRepository.findWorkspaceListByTeamId(teamId);
  }

  /**
   * Find Workspace List
   * @param dto
   * @returns Workspace[]
   */
  public async findWorkspaceList(dto: RequestWorkspaceFindDto) {
    return await this.workspaceRepository.findWorkspaceList(dto);
  }
}
