import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';


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
  signin(@Body() dto: CreateAuthDto, @Req() req, @Res() res) {
    return this.authService.signIn(dto,req, res)
  }

  @Get('signout')
  signout(@Body()  @Req() req, @Res() res, ) {
    return this.authService.signOut(req, res)
  }


  @Get('current-agent')
  async currentAgent(@Res() res: Response, @Headers('authorization') authorization: string ) {
    console.log(authorization);

    const token = authorization.split(' ').pop();

    if (!token) {
      return res.status(401).json({
        message: 'Invalid Token',
      });
    }

    const user = await this.authService.currentAgent(token);

    return res.status(200).json({
      user
    })
  }
}
