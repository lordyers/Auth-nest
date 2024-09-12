import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schemas/user.schema';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/list')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
    }

    @Get(':id')
    async getUser(
      @Param('id')
      id: string,
    ): Promise<User> {
      return this.userService.findById(id);
    }
}
