import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/login-user.dto';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() usersCreateInput: Prisma.usersCreateInput) {
    return this.userService.create(usersCreateInput);
  }

  @Post('login')
  login(@Body() userLoginDto : UserLoginDto) {
    return this.userService.login(userLoginDto);
  }

}
