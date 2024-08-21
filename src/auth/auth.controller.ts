import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login-user-dto';


@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post("/login")
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }
}
