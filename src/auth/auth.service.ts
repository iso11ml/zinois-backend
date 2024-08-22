import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async signUp(createUserDto: CreateUserDto) {

    let user = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email
      }
    })

    if (user) throw new BadRequestException('The email is already associated with an account.')

    const { password, email, ...userData} = createUserDto

    user = await this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        ...userData,
        password: bcrypt.hashSync(password, 10),
      }
    })

    delete user.password

    const payload = { id: user.id}

    return {
      account: user,
      token: await this.getJwtToken(payload),
    }
  }

  async signIn(loginUserDto: LoginUserDto){

    const user = await this.prisma.user.findFirst({
      where: {
        email: loginUserDto.email
      }
    })

    if(!user) throw new UnauthorizedException('The email is incorrect.')

    if(!bcrypt.compare(loginUserDto.password, user.password)) throw new UnauthorizedException('The  password is incorrect.')

    delete user.password

    const payload = { id: user.id}

    return {
      account: user,
      token: {
        token: await this.getJwtToken(payload),
      }
    };
  }

  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign( payload )

    return token
  }
}
