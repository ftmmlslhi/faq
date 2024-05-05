import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UserLoginDto } from './dto/login-user.dto';
import { hash } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: prismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(usersCreateInput: Prisma.usersCreateInput) {
    try {
      const user = await this.prisma.users.create({
        data: {
          username: usersCreateInput.username,
          password: hash('md5', usersCreateInput.password),
          email: usersCreateInput.email,
          role: usersCreateInput.role,
        },
      });
      return user;
    } catch (error) {
      console.error('Error createting user:', error);
      throw error;
    }
  }

  async login(userLoginDto: UserLoginDto) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          username: userLoginDto.username,
          password: hash('md5', userLoginDto.password),
        },
      });
      if (!user) {
        return 'user not found!';
      }
      const payload = { sub: user.user_id, username: user.username, role: user.role };
      const access_token = await this.jwtService.signAsync(payload);

      const res = {
        user: user,
        access_token: access_token,
      };
      return res;
    } catch (e) {
      console.error('Error in login:', e);
      throw e;
    }
  }
}
