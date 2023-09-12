import { Module } from '@nestjs/common';
import AuthModule from './auth/auth.module';
import UploadModule from './upload/upload.module';
import ViewModule from './view/view.module';
import AdapterModule from './adapter/adapter.module';
import UserModule from './user/user.module';
import WorkspaceModule from './workspace/workspace.module';
import WorkspaceUserModule from './workspace-user/workspace-user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    UploadModule,
    ViewModule,
    AdapterModule,
    WorkspaceModule,
    WorkspaceUserModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export default class ApiModule {}
