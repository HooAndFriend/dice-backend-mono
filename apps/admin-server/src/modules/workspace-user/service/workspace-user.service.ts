// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import WorkspaceUserRepository from '../repository/workspace-user.repository';

@Injectable()
export default class WorkspaceUserService {
  constructor(
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Find Workspace User List
   * @param userId
   * @returns
   */
  public async findWorkspaceUserList(userId: number) {
    return await this.workspaceUserRepository.findWorkspaceUserList(userId);
  }
}
