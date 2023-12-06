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

@Module({
  imports: [
    TypeOrmModule.forFeature([Diagram]),
    TypeOrmExModule.forCustomRepository([DiagramRepository]),
    WorkspaceModule,
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [DiagramController],
  providers: [DiagramService],
})
export default class DiagramModule {}
