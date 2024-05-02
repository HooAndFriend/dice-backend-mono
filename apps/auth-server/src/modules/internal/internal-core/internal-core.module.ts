// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import InternalCoreSenderService from './service/internal-core.sender.service';

@Module({
  imports: [],
  providers: [InternalCoreSenderService],
  exports: [InternalCoreSenderService],
  controllers: [],
})
export default class InternalCoreModule {}
