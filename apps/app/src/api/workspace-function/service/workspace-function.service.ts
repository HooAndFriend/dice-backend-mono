// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import WorkspaceFunctionRepository from '../repository/workspace-function.repository';
import DiceFunction from '@/src/common/enum/DiceFunction';
import CommonResponse from '@/src/common/dto/api.response';
import RequestSaveWorkspaceFunctionDto from '../dto/workspace-function.save.dto';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';

@Injectable()
export default class WorkspaceFunctionService {
  constructor(
    private readonly workspaceFunctionRepository: WorkspaceFunctionRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  public async findWorkspaceFunctionList(workspaceId: number) {
    const workspaceList =
      await this.workspaceFunctionRepository.findWorkspaceFunctionList(
        workspaceId,
      );

    const list = this.findDiceFunction().map((item) => ({
      function: item,
      isUse: workspaceList.some((_) => _.function === item),
    }));

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace Function List',
      data: {
        data: list,
        count: list.length,
      },
    });
  }

  public async saveWorkspaceFunction(dto: RequestSaveWorkspaceFunctionDto) {
    const findWorkspace = await this.workspaceRepository.findOne({
      where: { id: dto.workspaceId },
    });

    if (!findWorkspace) {
      return CommonResponse.createNotFoundException('Not Found Workspace');
    }

    const isExistFunction = await this.workspaceFunctionRepository.exist({
      where: {
        function: dto.function,
        workspace: { id: dto.workspaceId },
      },
    });

    if (isExistFunction) {
      return CommonResponse.createBadRequestException(
        'This Function is Existed',
      );
    }

    await this.workspaceFunctionRepository.save(
      this.workspaceFunctionRepository.create({
        function: dto.function,
        workspace: findWorkspace,
      }),
    );

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Save Workspace Function',
    });
  }

  private findDiceFunction() {
    return Object.values(DiceFunction);
  }
}
