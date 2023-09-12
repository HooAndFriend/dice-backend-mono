// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import { CustomRepository } from 'src/repository/typeorm-ex.decorator';
import Workspace from '../domain/workspace.entity';

@CustomRepository(Workspace)
export default class WorkspaceRepository extends Repository<Workspace> {}
