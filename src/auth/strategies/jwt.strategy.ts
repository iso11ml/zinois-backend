import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/service";
import { JwtPayload } from "../interfaces/jwt-payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
constructor(
    private readonly prisma: PrismaService,
    configService: ConfigService
){
    super({
        secretOrKey: configService.get("JWT_SECRET"),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken
    })
}

    async validate( payload: JwtPayload) : Promise<User>{
        const { id } = payload

        const user = await this.prisma.user.findFirst({
            where: {
                id: id
            }
        })

        if(!user) throw new UnauthorizedException('You are not authenticated')

        return; 
    }
}