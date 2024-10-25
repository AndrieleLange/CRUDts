import { ConflictException, Injectable, NotImplementedException } from '@nestjs/common';
import { userDto } from './dto/user.dto';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class UserService {
    constructor( private prisma: PrismaService){ }

    async createUser(name: string, email: string, password: string){
        const existUser = this.prisma.user.findFirst({
            where: {
                email
            }
        })

        if (existUser != null){
            throw new ConflictException("Email já está cadastrado")
        }

        return this.prisma.user.create({
            data: {
                email,
                name,
                password,
            }
        })
    }

    async updatePassword(email: string, password: string): Promise<string>{
        const existUser = this.prisma.user.findFirst({
            where: {
                email
            }
        })

        if (existUser == null){
            throw new ConflictException("Email não está cadastrado")
        }

        const atualizado = this.prisma.user.update({
            data : {
                email: (await existUser).email,
                name: (await existUser).name,
                password
            },
            where: {
                email
            }
        })

        if( atualizado != null){
            return "Senha atualizada com sucesso"
        } else {
            "Não foi possível atualizar a senha, tente novamente mais tarde"
        }
        
    }


    async findByEmail(email: string): Promise<userDto>{
        return this.prisma.user.findUnique({
            where: {
                email,
            }
        });
    }
    
}
