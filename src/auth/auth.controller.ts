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

  @Post()
create(@Body() createAuthrDto: CreateAuthDto) {
  return this.authService.signin(createAuthrDto)
}

}
