// ** Nest Imports
import { Module } from '@nestjs/common';
import UserModule from '../../user/user.module';

// ** Custom Module Imports

@Module({
  imports: [UserModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class InternalAuthModule {}
