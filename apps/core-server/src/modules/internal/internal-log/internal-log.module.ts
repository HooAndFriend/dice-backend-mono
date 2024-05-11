// ** Nest Imports
import { Module, forwardRef } from '@nestjs/common';

// ** Custom Module Imports
import InternalLogController from './controller/internal-log.controller';
import UserModule from '../../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [],
  exports: [],
  controllers: [InternalLogController],
})
export default class InternalLogModule {}
