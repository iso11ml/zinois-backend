import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/service';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ConfigService ],
      useFactory: ( configService: ConfigService) => {
        return {
          secret: configService.get("JWT_SECRET"),
          signOptions: { expiresIn: '60s' },
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
