import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id') 
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id)
    }

    @Post()
    async creteUser(@Body() user: User): Promise<User> {
        return this.userService.createUser(user);
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() userData: Partial<User>,
    ): Promise<User> {
        return this.userService.updateUser(id, userData)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
    
}