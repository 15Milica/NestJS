import { Module } from '@nestjs/common';
import { KorisnikController } from './korisnik.controller';
import { KorisnikService } from './korisnik.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Korisnik } from 'src/models/korisnik';

@Module({
  imports: [TypeOrmModule.forFeature([Korisnik])],
  controllers: [KorisnikController],
  providers: [KorisnikService]
})
export class KorisnikModule {}
