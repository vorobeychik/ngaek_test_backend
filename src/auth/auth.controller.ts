import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  auth(@Body() authDto: AuthDto) {
    return this.authService.auth(authDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

}
