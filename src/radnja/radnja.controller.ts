import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { RadnjaService } from './radnja.service';
import { RadnjaDto } from 'src/dto/radnja';

@Controller('radnja')
export class RadnjaController {

     constructor(private radnjaService: RadnjaService) {}

     @Get("SveRadnje")
     preuzmiRadnje() {
         return this.radnjaService.preuzmiRadnje();
     }
     
     //@UseGuards(JwtAuthenticationGuardRadnik)
     @Post("DodajRadnju")
     dodajRadnju(@Body() radnjaDto: RadnjaDto) {
         return this.radnjaService.dodajRadnju(radnjaDto);
     }
 
     //@UseGuards(JwtAuthenticationGuardRadnik)
     @Put("IzmeniRadnju")
     izmeniRadnju(@Body() radnjaDto: RadnjaDto) {
         return this.radnjaService.izmeniRadnju(radnjaDto);
     }

     //@UseGuards(JwtAuthenticationGuardRadnik)
     @Delete("IzbrisiRadnju/:id")
     izbrisiRadnju(@Param("id", ParseIntPipe) id: number) {
         return this.radnjaService.obrisiRadnju(id);
     }
     
     //@UseGuards(JwtAuthenticationGuardRadnik)
     @Put("DodajAutomobilURadnji/:idRadnje/:idAutomobila")
     dodajAutomobilURadnji(@Param("idRadnje",ParseIntPipe) idRadnje:number, @Param("idAutomobila",ParseIntPipe) idAutomobila:number) {
         return this.radnjaService.dodajAutomobilURadnji(idRadnje,idAutomobila);
     } 
}
