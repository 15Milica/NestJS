import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthAdminService } from "./auth-admin/auth-admin.service";
import { Admin } from "src/models/admin";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private autenAdminService: AuthAdminService) {
    super({
      usernameField: 'email',
      passwordField: 'lozinka',
    });
  }
  async validate(email: string, lozinka: string): Promise<Admin> {
    return this.autenAdminService.preuzmiAutentikovanogAdmina(email, lozinka)
  }
}