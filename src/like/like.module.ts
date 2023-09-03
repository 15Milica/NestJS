import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from 'src/models/like';
import { Korisnik } from 'src/models/korisnik';
import { Automobil } from 'src/models/automobil';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
     imports:[TypeOrmModule.forFeature([Like,Korisnik,Automobil])],
     controllers: [LikeController],
     providers: [LikeService]
})
export class LikeModule {}
