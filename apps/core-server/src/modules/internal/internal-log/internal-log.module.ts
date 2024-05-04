// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import InternalLogController from './controller/internal-log.controller';

@Module({
  imports: [],
  providers: [],
  exports: [],
  controllers: [InternalLogController],
})
export default class InternalLogModule {}
