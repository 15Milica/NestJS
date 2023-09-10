import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Token } from './token';
import { jwtConstants } from 'src/constants';
import { KorisnikService } from 'src/korisnik/korisnik.service';
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly korisnikService: KorisnikService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: jwtConstants.secret
    });
  }
 
  async validate(payload: Token) {
    return this.korisnikService.preuzmiPrekoId(payload.userId);
  }
}