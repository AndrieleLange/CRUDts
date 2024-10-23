import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { Prisma } from '@prisma/client';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [HeroModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
