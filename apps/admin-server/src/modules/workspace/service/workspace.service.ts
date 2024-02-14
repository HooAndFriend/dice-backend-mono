// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import WorkspaceRepository from '../repository/workspace.repository';

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
  public async findWOrksapceListByTeamId(teamId: number) {
    return await this.workspaceRepository.findWorkspaceListByTeamId(teamId);
  }
}
