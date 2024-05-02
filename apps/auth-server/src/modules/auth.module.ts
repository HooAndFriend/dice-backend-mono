import { Module } from '@nestjs/common';
import InternalModule from './internal/internal.module';

@Module({
  imports: [InternalModule],
  providers: [],
  exports: [],
  controllers: [],
})
export default class AuthModule {}
