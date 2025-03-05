import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

const respuesta: User = {
  id: 1,
  email: 'test@example.com',
  password: 'test123',
  createdAt: new Date(),
  updatedAt: new Date(),
  oculto: false,
};

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('El usuario debería estar registrado', async () => {
      const usuario: CreateUserDto = {
        email: 'test@example.com',
        password: 'test123',
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(respuesta);

      const result = await service.create(usuario);
      expect(result).toEqual(respuesta);
      expect(prismaService.user.create).toHaveBeenCalledWith({ data: usuario });
    });
  });

  describe('findAll', () => {
    it('Debería retornar una lista de usuarios', async () => {
      const usuarios: User[] = [respuesta];

      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(usuarios);

      const result = await service.findAll();
      expect(result).toEqual(usuarios);
      expect(prismaService.user.findMany).toHaveBeenCalled();
    });

    it('Si la función no encuentra nada en la BD, debería retornar un array vacío', async () => {
      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('Debería retornar un usuario por ID', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(respuesta);

      const result = await service.findOne(1);
      expect(result).toEqual(respuesta);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('Si el usuario no existe, debería retornar null', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('Debería actualizar un usuario', async () => {
      const updateData = { email: 'nuevo@example.com' };
      const updatedUser = { ...respuesta, ...updateData };

      jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser);

      const result = await service.update(1, updateData);
      expect(result).toEqual(updatedUser);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
      });
    });
  });

  describe('remove', () => {
    it('Debería eliminar un usuario', async () => {
      jest.spyOn(prismaService.user, 'delete').mockResolvedValue(respuesta);

      const result = await service.remove(1);
      expect(result).toEqual(respuesta);
      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
