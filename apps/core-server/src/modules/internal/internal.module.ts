// ** Nest Imports
import { Module } from '@nestjs/common';
import InternalAuthModule from './internal-auth/internal-auth.module';
import InternalLogModule from './internal-log/internal-log.module';

// ** Custom Module Imports

@Module({
  imports: [InternalAuthModule, InternalLogModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class InternalModule {}
