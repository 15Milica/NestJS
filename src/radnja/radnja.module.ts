import { Module } from '@nestjs/common';
import { RadnjaController } from './radnja.controller';
import { RadnjaService } from './radnja.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Radnja } from 'src/models/radnja';
import { Automobil } from 'src/models/automobil';

@Module({
     imports: [TypeOrmModule.forFeature([Radnja, Automobil])],
     controllers: [RadnjaController],
     providers: [RadnjaService],
})
export class RadnjaModule {}
