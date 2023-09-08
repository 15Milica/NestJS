import { Module } from '@nestjs/common';
import { IznajmljivanjeController } from './iznajmljivanje.controller';
import { IznajmljivanjeService } from './iznajmljivanje.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Korisnik } from 'src/models/korisnik';
import { Automobil } from 'src/models/automobil';
import { Iznajmljivanje } from 'src/models/iznajmljivanje';

@Module({
     imports: [TypeOrmModule.forFeature([Korisnik, Automobil, Iznajmljivanje])],
     controllers: [IznajmljivanjeController],
     providers: [IznajmljivanjeService],
})
export class IznajmljivanjeModule {}
