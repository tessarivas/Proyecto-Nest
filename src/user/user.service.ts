import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
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
