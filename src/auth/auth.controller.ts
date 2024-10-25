import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from 'src/user/dto/loginDto.dto';

@Controller()
export class AuthController{
    constructor(private readonly authService : AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async validarUser(@Body() LoginDto: LoginDto){
        return this.authService.validarUser(LoginDto.email, LoginDto.password);
    }

    // não funciona
    // @Get("/profile")
    // @UseGuards(AuthGuard)
    // getProfile(@Request() req){
    //     return req.user;
    // }

}
