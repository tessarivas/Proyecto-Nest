import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ description: "Datos del usuario", type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario creado', type: User })
  @ApiResponse({ status: 400, description: 'Datos inválidos', type: String })
  @ApiResponse({ status: 409, description: 'Correo ya existe', type: String })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] })
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado', type: String })
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'ID del usuario' })
  @ApiBody({ description: "Datos a actualizar del usuario", type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado', type: User })
  @ApiResponse({ status: 400, description: 'Datos inválidos', type: String })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado', type: String })
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado', type: String })
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
