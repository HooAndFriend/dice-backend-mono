// ** Nest Imports
import { forwardRef, Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../../global/repository/typeorm-ex.module';

// ** Custom Module Imports
import Epic from './domain/epic.entity';
import EpicService from './service/epic.service';
import EpicController from './controller/epic.controller';
import EpicRepository from './repository/epic.repository';
import WorkspaceModule from '../../workspace/workspace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Epic]),
    TypeOrmExModule.forCustomRepository([EpicRepository]),
    forwardRef(() => WorkspaceModule),
  ],
  exports: [TypeOrmExModule, TypeOrmModule, EpicService],
  controllers: [EpicController],
  providers: [EpicService],
})
export default class EpicModule {}
