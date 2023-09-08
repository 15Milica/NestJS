import { Module } from '@nestjs/common';
import { AutomobilController } from './automobil.controller';
import { AutomobilService } from './automobil.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Automobil } from 'src/models/automobil';
import { Iznajmljivanje } from 'src/models/iznajmljivanje';
import { Korisnik } from 'src/models/korisnik';
import { SlikaAutomobila } from 'src/models/slikaAutomobila';
import { Like } from 'src/models/like';

@Module({
     imports: [TypeOrmModule.forFeature([Automobil,Iznajmljivanje,Korisnik,SlikaAutomobila,Like])],
     controllers: [AutomobilController],
     providers: [AutomobilService],
})
export class AutomobilModule {}
