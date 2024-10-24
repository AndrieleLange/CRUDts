import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UsuarioPayload } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtservice: JwtService, private authService: AuthService){}
  // constructor(private readonly authService: AuthService) { }


//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     const { authorization } = context.switchToHttp().getRequest().headers;
//     console.log(authorization)
//     return this.authService.checarToken(authorization ?? "");
// }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    console.log("Token recebido:", token);
    
    if(!token){
      throw new UnauthorizedException();
    }

    try {
      const payload : UsuarioPayload = await this.jwtservice.verifyAsync(
        token,
        {
          secret: jwtConstants.secret,
        }
      );
      request.user = payload;
    } catch {
      throw new UnauthorizedException('Jwt inválido');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined{
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
