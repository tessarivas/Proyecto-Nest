import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (emailExists) {
      this.logger.error(`Email ${createUserDto.email} ya existe`);
      throw new ConflictException('Email ya existe');
    } 
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
      return this.prismaService.user.update({
        where: { id },
        data: { oculto: true },
      });
    }
}
