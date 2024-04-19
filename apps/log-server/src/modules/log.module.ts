// ** Nest Imports
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

// ** Custom Module Imports
import RequestLogModule from './request-log/request-log.module';
import QaHistoryLogModule from './qa-history-log/qa-history-log.module';
import TicketHistoryLogModule from './ticket-history-log/ticket-history-log.module';
import FileDownloadLogModule from './file-download-log/file-download-log.module';
import JwtAccessStrategy from '../global/guard/auth.jwt-access.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
    PassportModule,
    RequestLogModule,
    QaHistoryLogModule,
    TicketHistoryLogModule,
    FileDownloadLogModule,
  ],
  providers: [JwtAccessStrategy],
  exports: [],
  controllers: [],
})
export default class LogModule {}
