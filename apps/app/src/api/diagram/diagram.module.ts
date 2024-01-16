// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';
import DiagramRepository from './repository/diagram.repository';
import DiagramService from './service/diagram.service';
import DiagramController from './controller/diagram.controller';

// ** entity Imports
import Diagram from './domain/diagram.entity';
import WorkspaceModule from '../workspace/workspace.module';
import ErdController from './controller/erd.controller';
import ErdService from './service/erd.service';
import TableRepository from './repository/erd.table.repository';
import ColumnsRepository from './repository/erd.column.repository';
import MappingRepository from './repository/erd.mapping.repository';
import Columns from './domain/column.entity';
import Mapping from './domain/mapping.entity';
import Table from './domain/table.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diagram, Table, Columns, Mapping]),
    TypeOrmExModule.forCustomRepository([
      DiagramRepository,
      TableRepository,
      ColumnsRepository,
      MappingRepository,
    ]),
    WorkspaceModule,
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [DiagramController, ErdController],
  providers: [DiagramService, ErdService],
})
export default class DiagramModule {}
