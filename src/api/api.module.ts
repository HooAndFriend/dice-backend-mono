import { Module } from '@nestjs/common';
import AuthModule from './auth/auth.module';
import UploadModule from './upload/upload.module';
import ViewModule from './view/view.module';
import AdapterModule from './adapter/adapter.module';
import UserModule from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, UploadModule, ViewModule, AdapterModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class ApiModule {}
