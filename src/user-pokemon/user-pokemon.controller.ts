import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UserPokemonService } from './user-pokemon.service';
import { CreateUserPokemonDto } from './dto/create-user-pokemon.dto';

@Controller('user-pokemon')
export class UserPokemonController {
  constructor(private readonly userPokemonService: UserPokemonService) {}

  @Post()
  addFavorite(@Body() dto: CreateUserPokemonDto) {
    const { userId, pokemonId } = dto;
    return this.userPokemonService.addFavorite(Number(userId), Number(pokemonId));
  }

  // Ruta para obtener los Pokémon favoritos de un usuario específico
  @Get(':userId/favorites')
  getFavorites(@Param('userId') userId: string) {
    return this.userPokemonService.getFavorites(Number(userId));
  }

  // Ruta general para obtener todos los Pokémon favoritos de todos los usuarios
  @Get()
  getAllFavorites() {
    return this.userPokemonService.getFavorites();
  }
}
