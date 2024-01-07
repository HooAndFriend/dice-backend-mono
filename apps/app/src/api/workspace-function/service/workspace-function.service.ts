// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import WorkspaceFunctionRepository from '../repository/workspace-function.repository';
import DiceFunction from '@/src/common/enum/DiceFunction';
import CommonResponse from '@/src/common/dto/api.response';

@Injectable()
export default class WorkspaceFunctionService {
  constructor(
    private readonly workspaceFunctionRepository: WorkspaceFunctionRepository,
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

  private findDiceFunction() {
    return Object.values(DiceFunction);
  }
}
