// ** Nest Imports
import { Module } from '@nestjs/common';
import InternalAuthModule from './internal-auth/internal-auth.module';

// ** Custom Module Imports

@Module({
  imports: [InternalAuthModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class InternalModule {}
