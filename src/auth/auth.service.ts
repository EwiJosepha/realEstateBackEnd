import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
 async signin(dto:CreateAuthDto) {
  const {email, password} = dto
    return {message: "hey there"}
  }

  async signUp() {
    return 
  }


  async signOut() {
    return 
  }

 
}
