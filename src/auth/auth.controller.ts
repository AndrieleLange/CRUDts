import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/user/dto/loginDto.dto';

@Controller()
export class AuthController extends AuthGuard('jwt'){
    constructor(private readonly authService : AuthService){
        super();
    }

    @Post("/login")
    async validarUser(@Body() LoginDto: LoginDto){
        console.log("chegou aqui");
        return this.authService.validarUser(LoginDto.email, LoginDto.password);
    }
}
