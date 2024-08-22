import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), 
  ],
  controllers: [ContactController],
  providers: [ContactService, PrismaService],
})
export class ContactModule {}
