import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController extends AuthGuard('jwt'){
    constructor(private readonly authService : AuthService){
        super();
    }

    @Post("/login")
    async validarUser(@Body()data: any){
        return await this.authService.validarUser(data.email, data.password);
    }
}