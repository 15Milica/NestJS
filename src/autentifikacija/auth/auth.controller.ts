import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KorisnikDto } from 'src/dto/korisnik.dto';
import { Korisnik } from 'src/models/korisnik';
import { Response } from 'express';
import LocalAuthGuard from '../loacalAuth.guard';
import JwtAuthGuard from '../jwtAuth.guard';
import RequestSaKorisnikom from '../requestKorisinik';


@Controller('auth')
export class AuthController {
     constructor(private readonly autenService : AuthService) {}
 
     @Post('register')
     async register(@Body() korisnikDto: KorisnikDto) {
        return this.autenService.registrujSe(korisnikDto);
     }
 
     @HttpCode(200)
     @UseGuards(LocalAuthGuard)
     @Post('log-in')
     async logIn(@Req() request: RequestSaKorisnikom, @Res() response: Response) {
         const korisnik = <Korisnik>request.user;
         
         const cookie = this.autenService.KolacicSaJwtTokenon(korisnik.id);
         response.setHeader('Set-Cookie', cookie)
         
         korisnik.lozinka = undefined;
         
         return response.send(korisnik);
     }
 
     @UseGuards(JwtAuthGuard)
     @Post('log-out')
     async logOut(@Req() request: RequestSaKorisnikom, @Res() response: Response) {
         response.setHeader('Set-Cookie', this.autenService.kolacicZaLogOut());
         response.sendStatus(HttpStatus.OK);
         return response;
     }
 
     @UseGuards(JwtAuthGuard)
     @Get()
     autentifikuj(@Req() req:RequestSaKorisnikom) {
         const korisnik = <Korisnik>req.user;
         korisnik.lozinka = undefined;
         return korisnik
     }
}
