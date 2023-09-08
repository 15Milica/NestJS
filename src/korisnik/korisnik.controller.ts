import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { KorisnikService } from './korisnik.service';

@Controller('korisnik')
export class KorisnikController {
     constructor(private korisnikService: KorisnikService){}

     //@UseGuards(JwtAuthenticationGuard)
     @Put('izmeniLozinku/:email/:staraLozinka/:novaLozinka')
     async izmeniLozinku(@Param("email") email:string, @Param("staraLozinka") staraLozinka:string, @Param("novaLozinka") novaLozinka:string) {
         this.korisnikService.promeniLozinku(email, staraLozinka, novaLozinka);
     }
 
     //@UseGuards(JwtAuthenticationGuardRadnik)
     @Get("PretraziKorisnike/:email")
     pretraziKorisnike(@Param() {email}) {
         return this.korisnikService.PretraziKorisnike(email);
     }
}
