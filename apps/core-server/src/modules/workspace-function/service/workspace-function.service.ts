// ** Nest Imports
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// ** Custom Module Imports
import WorkspaceFunctionRepository from '../repository/workspace-function.repository';
import DiceFunction from '@/src/global/enum/DiceFunction';
import CommonResponse from '@/src/global/dto/api.response';
import RequestSaveWorkspaceFunctionDto from '../dto/workspace-function.save.dto';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';

@Injectable()
export default class WorkspaceFunctionService {
  constructor(
    private readonly workspaceFunctionRepository: WorkspaceFunctionRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  /**
   * 다운로드 가능한 기능 리스트
   * @param workspaceId
   * @returns
   */
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
      throw new NotFoundException('Not Found Workspace');
    }

    const isExistFunction = await this.workspaceFunctionRepository.exist({
      where: {
        function: dto.function,
        workspace: { id: dto.workspaceId },
      },
    });

    if (isExistFunction) {
      throw new BadRequestException('This Function is Existed');
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

  /**
   * Workspace의 Function List 조회
   * @param workspaceId
   * @returns
   */
  public async findFunctionList(workspaceId: number) {
    const [data, count] =
      await this.workspaceFunctionRepository.findFunctionList(workspaceId);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: 'Find Workspace Function List',
      data: {
        data: data,
        count: count,
      },
    });
  }

  /**
   * 기능 리스트 조회
   * @returns
   */
  private findDiceFunction() {
    return Object.values(DiceFunction);
  }
}
