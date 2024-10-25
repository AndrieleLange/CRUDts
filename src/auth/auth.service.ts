import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { userDto } from 'src/user/dto/user.dto';
import { jwtConstants } from './constants';

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
        const payload: UsuarioPayload = { email: user.email, password: user.password };

        const acess_token = this.jwtService.sign(
                { payload },
                {
                    secret : jwtConstants.secret,
                    expiresIn: '5m'

                }        
            )
            return acess_token
    }

    async checarToken(token: string){
        try {
            const requesterCanAccess = await this.jwtService.verifyAsync(token.replace(" Bearer ", ""))
            return requesterCanAccess
        } catch (err) {
            return false;
        }
    }

    

}

export interface UsuarioPayload {
    email: string;
    password: string;
  }
