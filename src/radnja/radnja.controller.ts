import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { RadnjaService } from './radnja.service';
import { RadnjaDto } from 'src/dto/radnja';
import JwtAuthGuard from 'src/autentifikacija/jwtAuth.guard';
import JwtAuthGuardAdmin from 'src/autentifikacija-admin/jwtAuthAdmin.guard';

@Controller('radnja')
export class RadnjaController {

     constructor(private radnjaService: RadnjaService) {}

     @Get("SveRadnje")
     preuzmiRadnje() {
         return this.radnjaService.preuzmiRadnje();
     }
     
     @UseGuards(JwtAuthGuardAdmin)
     @Post("DodajRadnju")
     dodajRadnju(@Body() radnjaDto: RadnjaDto) {
         return this.radnjaService.dodajRadnju(radnjaDto);
     }
 
     @UseGuards(JwtAuthGuardAdmin)
     @Put("IzmeniRadnju")
     izmeniRadnju(@Body() radnjaDto: RadnjaDto) {
         return this.radnjaService.izmeniRadnju(radnjaDto);
     }
     
     @UseGuards(JwtAuthGuardAdmin)
     @Delete("IzbrisiRadnju/:id")
     izbrisiRadnju(@Param("id", ParseIntPipe) id: number) {
         return this.radnjaService.obrisiRadnju(id);
     }
     
     @UseGuards(JwtAuthGuardAdmin)
     @Put("DodajAutomobilURadnji/:idRadnje/:idAutomobila")
     dodajAutomobilURadnji(@Param("idRadnje",ParseIntPipe) idRadnje:number, @Param("idAutomobila",ParseIntPipe) idAutomobila:number) {
         return this.radnjaService.dodajAutomobilURadnji(idRadnje,idAutomobila);
     } 
}
