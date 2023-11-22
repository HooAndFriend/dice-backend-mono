// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';
import ErdController from './controller/erd.controller';
import ErdService from './service/erd.service';
import WorkspaceModule from '../workspace/workspace.module';
import ColumnsRepository from './repository/erd.column.repository';
import TableRepository from './repository/erd.table.repository';
import MappingRepository from './repository/erd.mapping.repository';

// ** entity Imports
import Table from './domain/table.entity';
import Columns from './domain/column.entity';
import Mapping from './domain/mapping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Table, Columns, Mapping]),
    TypeOrmExModule.forCustomRepository([
      TableRepository,
      ColumnsRepository,
      MappingRepository,
    ]),
    WorkspaceModule,
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [ErdController],
  providers: [ErdService],
})
export default class ErdModule {}
