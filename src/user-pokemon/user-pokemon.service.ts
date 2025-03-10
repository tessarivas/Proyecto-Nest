import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserPokemonService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(userId: number, pokemonId: number) {
    const idUsuario = Number(userId);
    const idPokemon = Number(pokemonId);
  
    if (isNaN(idUsuario) || isNaN(idPokemon)) {
      throw new Error('userId y pokemonId deben ser números válidos');
    }
  
    // Verificar si el Pokémon existe en la base de datos
    const pokemonExistente = await this.prisma.pokemon.findUnique({
      where: { id: idPokemon },
    });
  
    if (!pokemonExistente) {
      throw new Error('El Pokémon con el id proporcionado no existe');
    }
  
    return this.prisma.userPokemon.create({
      data: { userId: idUsuario, pokemonId: idPokemon },
    });
  }
  

  async getFavorites(userId?: number) {
    if (userId) {
      return this.prisma.userPokemon.findMany({
        where: { userId },
        include: { pokemon: true },
      });
    } else {
      return this.prisma.userPokemon.findMany({
        include: { pokemon: true },
      });
    }
  }  
}
