// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import AdapterService from './service/adapter.service';
import AdapterController from './controller/adapter.controller';

@Module({
  imports: [],
  providers: [AdapterService],
  exports: [AdapterService],
  controllers: [AdapterController],
})
export default class AdapterModule {}
