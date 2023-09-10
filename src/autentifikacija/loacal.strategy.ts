import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Korisnik } from "src/models/korisnik";
import { AuthService } from "./auth/auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private autenService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'lozinka',
    });
  }
  async validate(email: string, lozinka: string): Promise<Korisnik> {
    console.log(email)
    console.log(lozinka);
    return this.autenService.preuzmiAutentikovanogKorisnika(email, lozinka);
  }
}