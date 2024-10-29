import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor (private readonly user: UserService) {}
    
    @Post("/user")
    async createUser(@Body() data: userDto) {
        return this.user.createUser(data.name, data.email, data.password);
    }

    @Post("/update")
    async updatePassword(@Body() data: userDto){
        return this.user.updatePassword(data.email, data.password);
    }
}
