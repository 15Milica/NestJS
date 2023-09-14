import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import LocalAuthGuardAdmin from '../loacalAuthAdmin.guard';
import RequestSaAdminom from '../requestAdmin';
import { Admin } from 'src/models/admin';
import JwtAuthGuardAdmin from '../jwtAuthAdmin.guard';
import {Response} from "express";

@Controller('auth-admin')
export class AuthAdminController {
     constructor(private readonly autenAdminService: AuthAdminService) {}
     
     @HttpCode(200)
     @UseGuards(LocalAuthGuardAdmin)
     @Post('log-in')
     async logIn(@Req() request: RequestSaAdminom, @Res() response: Response) {
          const admin = <Admin>request.user;
          let kolacic = this.autenAdminService.JwtToken(admin.id);
          response.setHeader('Set-Cookie', kolacic);
          admin.lozinka = undefined;
          response.send(admin);    
     }
  
     @UseGuards(JwtAuthGuardAdmin)
     @Post('log-out')
     async logOut(@Req() request: RequestSaAdminom, @Res() response: Response) {
          response.setHeader('Set-Cookie', this.autenAdminService.preuzmiKolacicZaLogOut());
          response.sendStatus(HttpStatus.OK);
          return response
     }
  
     @UseGuards(JwtAuthGuardAdmin)
     @Get("Validiraj")
     authenticate(@Req() request: RequestSaAdminom) {
          const admin = <Admin>request.user;
          admin.lozinka = undefined;
          return admin;
     }
}
