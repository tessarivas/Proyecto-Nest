import { Module } from '@nestjs/common';
import { UserPokemonService } from './user-pokemon.service';
import { UserPokemonController } from './user-pokemon.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserPokemonController],
  providers: [UserPokemonService],
})
export class UserPokemonModule {}
