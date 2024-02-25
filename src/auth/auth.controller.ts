import { Controller, Get, HttpException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  async token(@Req() req: Request) {
    if (!req.headers.authorization) {
      throw new HttpException('Authorization header is missing', 401);
    }

    const userToken = req.headers.authorization.split(' ')[1];

    if (!userToken) {
      throw new HttpException('Token is missing', 401);
    }

    return this.authService.authenticateUser(userToken);
  }

  @Get('keys')
  keys() {
    return this.authService.getKeys();
  }
}
