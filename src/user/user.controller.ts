import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

import { UserAuthGuard } from './user.guard'; // Guard for authorization | Middleware

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post("signup")
    signup(@Body() body: CreateUserDto) {
        return this.userService.createNewUser(body.username, body.email, body.password);
    }

    @Post('login')
    login(@Body() body: CreateUserDto){
        return this.userService.loginUser(body.email, body.password);
    }

    @UseGuards(UserAuthGuard)
    @Get("profile")
    userProfile(@Request() req) {
        return req.user;
    }

}
