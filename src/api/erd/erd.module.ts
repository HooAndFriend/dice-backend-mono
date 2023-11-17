// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../repository/typeOrmEx.module';
import ErdController from './controller/erd.controller';
import ErdService from './service/erd.service';
import Table from './domain/table.entity';
import WorkspaceModule from '../workspace/workspace.module';
import Columns from './domain/column.entity';
import ColumnRepository from './repository/erd.column.repository';
import TableRepository from './repository/erd.table.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Table]),
    TypeOrmExModule.forCustomRepository([TableRepository]),
    TypeOrmModule.forFeature([Columns]),
    TypeOrmExModule.forCustomRepository([ColumnRepository]),
    WorkspaceModule,
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [ErdController],
  providers: [ErdService],
})
export default class ErdModule {}
