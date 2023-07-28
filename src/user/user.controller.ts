/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { userEntity } from './userEntity/userEntity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/userList')
    getUsers() : any {
        return this.userService.usersList();
    }
    @Get('/userList/:id')
    getUser(@Param('id', ParseIntPipe) id: number) : any {
        //return this.userService.user(id)
    }
    @Post('/addUser')
    getAddUser(@Body() body : userEntity ) : any {
        return this.userService.addUser(body);
    }
}
