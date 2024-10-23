import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { userDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validarUser(email: string, password: string) : Promise<any>{
        const user = await this.userService.findByEmail(email);

        if (!user){
            throw new UnauthorizedException("Email ou senha inválidos")
        }
        if(user.password === password){
            return this.gerarToken(user)
        }
        throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }

    async gerarToken(user: userDto){
        return {
            acess_token: this.jwtService.sign(
                { email : user.email},
                {
                    secret : 'topsecret',
                    expiresIn : '5m'
                },
            ),
        }
    }
}
