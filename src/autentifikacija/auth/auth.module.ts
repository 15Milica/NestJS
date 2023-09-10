import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Korisnik } from 'src/models/korisnik';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { KorisnikModule } from 'src/korisnik/korisnik.module';
import { jwtConstants } from 'src/constants';
import { LocalStrategy } from '../loacal.strategy';
import { JwtStrategy } from '../jwt.strategy';
import { KorisnikService } from 'src/korisnik/korisnik.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Korisnik]),
    PassportModule,
    KorisnikModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
            expiresIn: "1h"
        }
    })
  ],
  providers:[LocalStrategy,AuthService,JwtStrategy,KorisnikService],
  controllers:[AuthController]
})
export class AuthModule {}
