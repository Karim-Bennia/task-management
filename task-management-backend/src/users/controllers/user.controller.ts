// user.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/userService';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }
}
