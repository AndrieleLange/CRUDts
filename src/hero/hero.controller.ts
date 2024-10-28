import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { HeroDto } from './dto/hero.dto';
import { HeroService } from './hero.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('hero')
export class HeroController {
    constructor (private readonly heroService: HeroService,
        private readonly authService: AuthService
    ) {}

    @Post("cadastrar")
    @UseGuards(AuthGuard)
    async create(
        @Request() req,
        @Query("email") email: string,
        @Body() data: HeroDto) {
            const validado = await this.authService.validarToken(req, email);
            if (validado){
                return await this.heroService.create(data);
            }
            throw new UnauthorizedException("Email não autorizado");
    }

    @Post("all")
    @UseGuards(AuthGuard)
    async createAll(
        @Request() req,
       @Query("email") email: string,
        @Body() data: HeroDto[]
    ){
        const validado = await this.authService.validarToken(req, email);
        if (validado){
            return await this.heroService.createAll(data);
        }
        throw new UnauthorizedException("Email não autorizado");
    }


    @Get("/buscarTodos")
    @UseGuards(AuthGuard)
    async findAll(
        @Request() req,
        @Query("email") email: string,
    ) {
        const validado = await this.authService.validarToken(req, email);
        if (validado){
            return await this.heroService.findAll();
        }
        throw new UnauthorizedException("Email não autorizado");}

    @Get("/buscar:id")
    @UseGuards(AuthGuard)
    async findById(
        @Param("id") id: number,
        @Request() req,
        @Query("email") email: string,){
        const validado = await this.authService.validarToken(req, email);
        if (validado){
            return this.heroService.findById(Number(id));
        }
        throw new UnauthorizedException("Email não autorizado");
    }

    @Put("/atualizar:id")
    @UseGuards(AuthGuard)
    async update(
        @Param("id") id: number, 
        @Body() data: HeroDto,
        @Request() req,
        @Query("email") email: string,
    ){
        const validado = await this.authService.validarToken(req, email);
        if (validado){
            return this.heroService.update(Number(id), data);
        }
        throw new UnauthorizedException("Email não autorizado");
    }

    @Delete("/excluir:id")
    @UseGuards(AuthGuard)
    async delete(
        @Param("id") id: number,
        @Request() req,
        @Query("email") email: string,
    ){
        const validado = await this.authService.validarToken(req, email);
        if (validado){
            return this.heroService.delete(Number(id));
        }
        throw new UnauthorizedException("Email não autorizado");
    }
}
