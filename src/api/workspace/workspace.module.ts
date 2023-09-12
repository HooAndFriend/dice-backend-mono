// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from 'src/repository/typeOrmEx.module';
import Workspace from './domain/workspace.entity';
import WorkspaceRepository from './repository/workspace.repository';
import WorkspaceController from './controller/workspace.controller';
import WorkspaceService from './service/workspace.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace]),
    TypeOrmExModule.forCustomRepository([WorkspaceRepository]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export default class WorkspaceModule {}
