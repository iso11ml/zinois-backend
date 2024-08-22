import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/service';

@Injectable()
export class ContactService {

  constructor( private readonly prisma: PrismaService){}

  async create(createContactDto: CreateContactDto) {

    const owner = await this.prisma.user.findUnique({
      where: {
        id: createContactDto.userId
      }
    })

    if(!owner) throw new BadRequestException('The user is trying to register a contact that does not exist.')


    const newContact = await this.prisma.contact.create({
      data: {
        ...createContactDto
      }
    })

    return newContact
  }

  
  async findAll(userId: string ) {
    const contacts = await this.prisma.contact.findMany({
      where:{
        userId: userId
      }
    })

    return contacts
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
