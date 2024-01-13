// ** Nest Imports
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// ** Custom Module Imports
import AuthController from './controller/auth.controller';
import AuthService from './service/auth.service';
import JwtAccessStrategy from './passport/auth.jwt-access.strategy';
import JwtRefreshStrategy from './passport/auth.jwt-refresh.strategy';
import UserModule from '../user/user.module';
import WorkspaceModule from '../workspace/workspace.module';
import WorkspaceUserModule from '../workspace-user/workspace-user.module';
import { MailModule } from '@/src/util/mail/mail.module';

@Module({
  imports: [
    UserModule,
    WorkspaceModule,
    WorkspaceUserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  exports: [],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
})
export default class AuthModule {}
