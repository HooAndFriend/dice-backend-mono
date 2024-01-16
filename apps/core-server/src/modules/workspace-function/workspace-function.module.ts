// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import WorkspaceFunctionController from './controller/workspace-function.controller';
import WorkspaceFunctionService from './service/workspace-function.service';
import WorkspaceFunction from './domain/workspace-function.entity';
import WorkspaceFunctionRepository from './repository/workspace-function.repository';
import WorkspaceModule from '../workspace/workspace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkspaceFunction]),
    TypeOrmExModule.forCustomRepository([WorkspaceFunctionRepository]),
    WorkspaceModule,
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [WorkspaceFunctionController],
  providers: [WorkspaceFunctionService],
})
export default class WorkspaceFunctionModule {}
