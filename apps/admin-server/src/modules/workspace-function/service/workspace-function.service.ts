// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import WorkspaceFunctionRepository from '../repository/workspace-function.repository';
import WorkspaceRepository from '../../workspace/repository/workspace.repository';

@Injectable()
export default class WorkspaceFunctionService {
  constructor(
    private readonly workspaceFunctionRepository: WorkspaceFunctionRepository,
  ) {}
}
