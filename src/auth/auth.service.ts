import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from "../utils/constants"

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }
  async signUp(dto: CreateAuthDto) {
    const { email, hashpassword } = dto
    const foundAgent = await this.prisma.agent.findUnique({
      where: { email: email }
    })

    if (foundAgent) {
      throw new BadRequestException('Email already exists')
    }
    const hashedPassword = await this.hashPassword(hashpassword)
    await this.prisma.agent.create({
      data: {
        email,
        hashpassword
      }
    })

    console.log(hashedPassword);

    return { message: "hey there" }

  }


  async signIn(dto: CreateAuthDto) {
    const { email, hashpassword } = dto
    const foundAgent = await this.prisma.agent.findUnique({
      where: { email: email }
    })

    if (!foundAgent) {
      throw new BadRequestException('wrong credentials')
    }

    const isMatch = await this.comparePasswords({ hashpassword, hash: foundAgent.hashpassword 
    })
    console.log(`Hashed Password from DB: ${foundAgent.hashpassword}`);
    console.log(`Provided Password: ${hashpassword}`);

    if (!isMatch) {
      throw new BadRequestException("invalid password")
    }

    const token = await this.signToken({ id: foundAgent.id, email: foundAgent.email })

    // Signing jwt and returning to the agent

    return { token }
  }


  async signOut() {
    return
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)
    return hashedPassword
  }

  async comparePasswords(args: { hashpassword: string, hash: string }) {
    return await bcrypt.compare(args.hashpassword, args.hash)
  }

  async signToken(args: { id: number, email: string }) {
    const payload = args
    return this.jwt.signAsync(payload, { secret: jwtSecret })
  }


}
