//auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.auth';
import { PrismaService } from 'src/database/prisma.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'topsecret', // A chave usada para assinar o token
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, PrismaService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard('jwt'),
    // },
  ],
})
export class AuthModule {}
