// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../global/repository/typeorm-ex.decorator';
import WorkspaceFunction from '../domain/workspace-function.entity';

@CustomRepository(WorkspaceFunction)
export default class WorkspaceFunctionRepository extends Repository<WorkspaceFunction> {
  public async findWorkspaceFunctionList(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspaceFunction')
      .select([
        'workspaceFunction.workspaceFunctionId',
        'workspaceFunction.function',
      ])
      .where('workspaceFunction.workspaceId = :workspaceId', { workspaceId });

    return await queryBuilder.getMany();
  }

  public async findFunctionList(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspaceFunction')
      .select([
        'workspaceFunction.workspaceFunctionId',
        'workspaceFunction.function',
      ])
      .where('workspaceFunction.workspaceId = :workspaceId', { workspaceId });

    return await queryBuilder.getManyAndCount();
  }
}
