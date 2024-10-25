import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HeroDto } from './dto/hero.dto';
import { HeroService } from './hero.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('hero')
export class HeroController {
    constructor (private readonly heroService: HeroService) {}
    @Post("/cadastrar")
    @UseGuards(AuthGuard)
    async create(@Body() data: HeroDto) {
        return this.heroService.create(data);
    }

    @Post("/all")
    @UseGuards(AuthGuard)
    async createAll(@Body() data: HeroDto[]){
        return this.heroService.createAll(data);
    }

    @Get("/buscarTodos")
    @UseGuards(AuthGuard)
    async findAll() {
        return await this.heroService.findAll();
    }

    @Get("/buscar:id")
    @UseGuards(AuthGuard)
    async findById(@Param("id") id: number){
        return this.heroService.findById(Number(id));
    }

    @Put("/atualizar:id")
    @UseGuards(AuthGuard)
    async update(@Param("id") id: number, @Body() data: HeroDto){
        return this.heroService.update(Number(id), data);
    }

    @Delete("/excluir:id")
    @UseGuards(AuthGuard)
    async delete(@Param("id") id: number){
        return this.heroService.delete(Number(id));
    }
}
