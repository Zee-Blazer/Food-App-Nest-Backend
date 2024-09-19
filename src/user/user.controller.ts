import { Body, Controller, Post, Get, UseGuards, Request, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';

import { UserAuthGuard } from './user.guard'; // Guard for authorization | Middleware
import { CreateUserDto } from './dtos/create-user.dto'; // Create user DTO
import { UpdateUserDto } from './dtos/update-user.dto'; // Update user DTO

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

    @Patch('update/:id')
    updateProfile(@Param("id") id: string, @Body() body: UpdateUserDto) {
        return this.userService.updateUserProfile(parseInt(id), body);
    }

}
