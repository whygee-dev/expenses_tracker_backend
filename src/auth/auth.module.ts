import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, ConfigService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
