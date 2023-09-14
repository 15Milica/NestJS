import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from 'src/constants';
import { Token } from 'src/autentifikacija/token';
import { AdminService } from 'src/admin/admin.service';
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtAdmin') {
  constructor(
    private readonly adminService: AdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: jwtConstants.secretAdmin
    });
  }
 
  async validate(payload: Token) {
    return this.adminService.preuzmiPrekoId(payload.userId);
  }
}