import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UserLoginDto } from './dto/login-user.dto';
import { hash } from 'crypto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: prismaService) {}

  async create(usersCreateInput: Prisma.usersCreateInput) {
    try {
      const user = await this.prisma.users.create({
        data: {
          username: usersCreateInput.username,
          password: hash('md5', usersCreateInput.password),
          email: usersCreateInput.email,
          role: usersCreateInput.role,
        }
      });
      return user
    } catch (error) {
      console.error('Error createting user:', error);
      throw error;
    }
  }

  async login(userLoginDto: UserLoginDto) {    
    try{
     const user = await this.prisma.users.findUnique({
          where: {
            username: userLoginDto.username,
            password: hash('md5', userLoginDto.password),
          },
      })
      if (!user) {
        return 'user not found!';
      }
      return user
    }catch(e){
      console.error('Error in login:', e);
      throw e;
    }
  }
}
