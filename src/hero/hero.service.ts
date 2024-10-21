import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { HeroDto } from './dto/hero.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class HeroService {
    constructor (private prisma: PrismaService) {}
    async create (data: HeroDto){
        const hero = await this.prisma.hero.create({
            data
        });
        return hero;
    }

    async createAll(data: HeroDto[]){
        // Busca por heróis que já existem
        const existingHeroes = await this.prisma.hero.findMany({
            where: {
                civilName: {
                    in: data.map(hero => hero.civilName),
                },
            }
        });
    
        // Filtra os heróis que ainda não foram cadastrados
        const newHeroes = data.filter(hero => 
            !existingHeroes.some(existingHero => existingHero.civilName === hero.civilName)
        );
    
        // Se não houver heróis novos, lança erro
        if (newHeroes.length === 0) {
            throw new NotImplementedException("Heróis já cadastrados");
        }
    
        // Cria os novos heróis
        const aux = await this.prisma.hero.createMany({
            data: newHeroes,
        });
    
        return aux;
    }
    

    async findAll(): Promise<HeroDto[]> {
        return await this.prisma.hero.findMany();
    }

    async findByName(id: number, data: HeroDto): Promise<HeroDto>{
        const hero = await this.prisma.hero.findFirst({
            where: {
                id,
            }
        });

        if( !hero ){
            throw new NotFoundException("Herói não encontrado");
        }

        return hero;
    }

    async update(id: number, data: HeroDto){
        const hero = await this.prisma.hero.findUnique({
            where: {
                id,
            }
        });
        if (!hero){
            throw new NotFoundException("Herói não encontrado");
        } 

        return await this.prisma.hero.update({
            data,
            where: {
                id,
            }
        });
    }

    async delete (id: number){
        const hero = await this.prisma.hero.findUnique({
            where: {
                id,
            }
        })

        if(!hero){
            throw new NotFoundException("Herói não existe")
        }

        return await this.prisma.hero.delete({
            where: {
                id,
            }
        });
    }
}
