// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import WorkspaceRepository from '../repository/workspace.repository';
import RequestWorkspaceFindDto from '../dto/workspace.find.dto';
import { NotFoundException } from '@hi-dice/common';

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
    const [data, count] = await this.workspaceRepository.findWorkspaceList(dto);

    return [
      data.map((item) => ({
        id: item.id,
        name: item.name,
        comment: item.comment,
        createdId: item.createdId,
        createdDate: item.createdDate,
        workspaceUserCount: item.workspaceUser.length,
      })),
      count,
    ];
  }

  /**
   * Find Worksapce By Id
   * @param workspaceId
   * @returns
   */
  public async findWorksapceById(workspaceId: number) {
    const workspace = await this.workspaceRepository.findWorkspaceById(
      workspaceId,
    );

    if (!workspace) {
      throw new NotFoundException('Not Found Workspace');
    }

    return workspace;
  }
}
