import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { Token } from 'src/autentifikacija/token';
import { jwtConstants } from 'src/constants';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthAdminService {
     
     constructor(private readonly adminService: AdminService, private readonly jwtService: JwtService) {}
     
     public JwtToken(adminId: number) {
        const payload: Token = { userId:adminId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${"1h"}`;
     }
     
     public async preuzmiAutentikovanogAdmina(email: string, hashedPassword: string) {
          try {
               const admin = await this.adminService.preuzmiPrekoEmaila(email);
               const isPasswordMatching = await bcrypt.compare(
               hashedPassword,
               admin.lozinka
               );
               if (!isPasswordMatching) {
                    throw new HttpException('Losa lozika', HttpStatus.BAD_REQUEST);
               }
               admin.lozinka = undefined;
               return admin;
          } catch (error) {
               throw new HttpException('Nesto je poslo po zlu.', HttpStatus.BAD_REQUEST);
          }
     }
     public preuzmiKolacicZaLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
     }
}
