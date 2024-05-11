// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import InternalCoreModule from './internal-core/internal-core.module';

@Module({
  imports: [InternalCoreModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class InternalModule {}
