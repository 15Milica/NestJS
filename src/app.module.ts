import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { RadnjaModule } from './radnja/radnja.module';
import { KorisnikModule } from './korisnik/korisnik.module';
import { LikeModule } from './like/like.module';
import { IznajmljivanjeModule } from './iznajmljivanje/iznajmljivanje.module';
import { AutomobilModule } from './automobil/automobil.module';
import { AuthModule } from './autentifikacija/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, KorisnikModule, AutomobilModule, RadnjaModule, LikeModule, IznajmljivanjeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
