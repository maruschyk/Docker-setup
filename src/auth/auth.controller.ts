import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Реєстрація користувача' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 409 })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Логін користувача' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
