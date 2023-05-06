import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Controller('login')
export class LoginController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const user = await this.userService.findByEmail(email);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      const passwordMatch = await bcrypt.compare(password, user?.password);

      if (!passwordMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const token = await this.userService.generateToken(user);

      return { access_token: token };
    } catch (err) {
      throw err;
    }
  }
}
