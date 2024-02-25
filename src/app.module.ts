import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: PrismaClient,
      useClass: PrismaClient,
    },
  ],
})
export class AppModule {}
