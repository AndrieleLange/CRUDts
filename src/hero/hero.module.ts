import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
    providers: [HeroService, PrismaService],
    controllers: [HeroController]
})
export class HeroModule {}
