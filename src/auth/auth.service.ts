import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { userDto } from 'src/user/dto/user.dto';
import { jwtConstants } from './constants';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validarUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException("Email ou senha inválidos")
        }
        if (user.password === password) {
            return this.gerarToken(user)
        }
        throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }

    async gerarToken(user: userDto) {
        const payload: UsuarioPayload = {  email: user.email, password: user.password };

        const acess_token = this.jwtService.sign(
            { payload },
            {
                secret: jwtConstants.secret,
                expiresIn: '5m'
            }
        )
        return acess_token
    }

    async validarToken(req: Request & { headers: { authorization?: string } }, email: string) {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.split(" ")[1] : null;

        if (!token) {
            throw new UnauthorizedException("Token não encontrado");
        }
        if (token) {
            let decodedToken = jwt.decode(token);

            decodedToken = decodedToken as UsuarioPayload;
         
            if (decodedToken.payload.email === email){
                return true;
            }
        }
        return false;
    }

    async checarToken(token: string) {
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
