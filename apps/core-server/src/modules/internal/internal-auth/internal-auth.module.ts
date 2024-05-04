// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Custom Module Imports
import UserModule from '../../user/user.module';
import InternalAuthController from './controller/internal-auth.controller';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [],
  exports: [],
  controllers: [InternalAuthController],
})
export default class InternalAuthModule {}
