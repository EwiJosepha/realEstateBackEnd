import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get()
  // async sign () {
  //   return this.authService.signin()
  // }

  @Post('signup')
  signup(@Body() dto:CreateAuthDto) {
    return this.authService.signUp(dto)
  }

  @Post('signin')
  signin(@Body() dto: CreateAuthDto) {
    return this.authService.signIn(dto)
  }
  
  @Get('signout')
  signout(@Body() dto: CreateAuthDto) {
    return this.authService.signOut()
  }

}
