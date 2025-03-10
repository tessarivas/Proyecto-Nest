import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserPokemonModule } from './user-pokemon/user-pokemon.module';

@Module({
  imports: [UserModule, PrismaModule, UserPokemonModule],
  providers: [AppService, PrismaService],
})
export class AppModule {}

