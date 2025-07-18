import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDTO, UserDTO } from "./user.dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Post() 
    async createUser(@Body() user: CreateUserDTO) {
        return await this.userService.createUser(user);
    }

    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updatedUser: CreateUserDTO,
    ) {
        return this.userService.updateUser(id, updatedUser);
    }
}