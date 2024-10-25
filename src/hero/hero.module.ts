import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
      AuthModule,
    ],
    controllers: [HeroController],
    providers: [HeroService, AuthGuard, PrismaService, JwtService],
  })
  export class HeroModule {}
