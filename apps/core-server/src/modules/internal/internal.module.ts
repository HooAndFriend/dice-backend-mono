// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import InternalAuthModule from './internal-auth/internal-auth.module';
import InternalLogModule from './internal-log/internal-log.module';
import InternalPushModule from './internal-push/internal-push.module';

@Module({
  imports: [InternalAuthModule, InternalLogModule, InternalPushModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class InternalModule {}
