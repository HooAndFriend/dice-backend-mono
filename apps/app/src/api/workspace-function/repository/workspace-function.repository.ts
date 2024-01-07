// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import CustomRepository from '../../../repository/typeorm-ex.decorator';
import WorkspaceFunction from '../domain/workspace-function.entity';

@CustomRepository(WorkspaceFunction)
export default class WorkspaceFunctionRepository extends Repository<WorkspaceFunction> {
  public async findWorkspaceFunctionList(workspaceId: number) {
    const queryBuilder = this.createQueryBuilder('workspaceUser').select([
      'workspaceUser.id, workspaceUser.function',
    ]);

    return queryBuilder.getMany();
  }
}
