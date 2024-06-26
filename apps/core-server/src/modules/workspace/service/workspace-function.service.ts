// ** Nest Imports
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// ** Custom Module Imports
import WorkspaceFunctionRepository from '../repository/workspace-function.repository';

// ** Dto Imports
import { DiceFunction } from '@hi-dice/common';
import RequestSaveWorkspaceFunctionDto from '../dto/workspace-function.save.dto';
import Workspace from '../domain/workspace.entity';

@Injectable()
export default class WorkspaceFunctionService {
  constructor(
    private readonly workspaceFunctionRepository: WorkspaceFunctionRepository,
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

    return this.findDiceFunction().map((item) => ({
      function: item,
      isUse: workspaceList.some((_) => _.function === item),
    }));
  }

  /**
   * Save Workspace Function
   * @param workspace
   * @param dto
   */
  public async saveWorkspaceFunction(
    workspace: Workspace,
    dto: RequestSaveWorkspaceFunctionDto,
  ) {
    await this.workspaceFunctionRepository.save(
      this.workspaceFunctionRepository.create({
        function: dto.function,
        workspace,
      }),
    );
  }

  /**
   * Workspace의 Function List 조회
   * @param workspaceId
   * @returns
   */
  public async findFunctionList(workspaceId: number) {
    return await this.workspaceFunctionRepository.findFunctionList(workspaceId);
  }

  /**
   * 기능 리스트 조회
   * @returns
   */
  private findDiceFunction() {
    return Object.values(DiceFunction);
  }

  /**
   * Existed Workspace Function
   * @param workspaceId
   * @param diceFunction
   */
  public async isExistedWorksapceFunction(
    workspaceId: number,
    diceFunction: DiceFunction,
  ) {
    const isExistFunction = await this.workspaceFunctionRepository.exist({
      where: {
        function: diceFunction,
        workspace: { workspaceId },
      },
    });

    if (isExistFunction) {
      throw new BadRequestException('This Function is Existed');
    }
  }

  /**
   * Remove Workspace Function
   * @param workspace
   * @param dto
   */
  public async removeWorkspaceFunction(
    workspace: Workspace,
    dto: RequestSaveWorkspaceFunctionDto,
  ) {
    await this.workspaceFunctionRepository.delete({
      function: dto.function,
      workspace: { workspaceId: workspace.workspaceId },
    });
  }

  /**
   * Existed Workspace Function
   * @param workspaceId
   * @param diceFunction
   */
  public async isExistedWorksapceFunctionNot(
    workspaceId: number,
    diceFunction: DiceFunction,
  ) {
    const isExistFunction = await this.workspaceFunctionRepository.exist({
      where: {
        function: diceFunction,
        workspace: { workspaceId },
      },
    });

    if (!isExistFunction) {
      throw new NotFoundException('Not Found Function');
    }
  }

  /**
   * 워크스페이스의 초기 기능 저장
   * @param workspace
   */
  public async saveWorkspaceInitFunction(workspace: Workspace) {
    const boardFunction = await this.workspaceFunctionRepository.save(
      this.workspaceFunctionRepository.create({
        function: DiceFunction.BOARD,
        workspace,
      }),
    );

    const ticketFunction = await this.workspaceFunctionRepository.save(
      this.workspaceFunctionRepository.create({
        function: DiceFunction.TICKET,
        workspace,
      }),
    );

    return [boardFunction, ticketFunction];
  }
}
