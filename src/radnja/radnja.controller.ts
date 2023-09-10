import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { RadnjaService } from './radnja.service';
import { RadnjaDto } from 'src/dto/radnja';
import { Role } from 'src/autentifikacija/Role/Role';
import { Roles } from 'src/autentifikacija/Role/roles.decorator';
import JwtAuthGuard from 'src/autentifikacija/jwtAuth.guard';

@Controller('radnja')
export class RadnjaController {

     constructor(private radnjaService: RadnjaService) {}

     @Get("SveRadnje")
     preuzmiRadnje() {
         return this.radnjaService.preuzmiRadnje();
     }
     
     @UseGuards(JwtAuthGuard)
     @Roles(Role.ADMIN)
     @Post("DodajRadnju")
     dodajRadnju(@Body() radnjaDto: RadnjaDto) {
         return this.radnjaService.dodajRadnju(radnjaDto);
     }
 
     @UseGuards(JwtAuthGuard)
     @Roles(Role.ADMIN)
     @Put("IzmeniRadnju")
     izmeniRadnju(@Body() radnjaDto: RadnjaDto) {
         return this.radnjaService.izmeniRadnju(radnjaDto);
     }

     @UseGuards(JwtAuthGuard)
     @Roles(Role.ADMIN)
     @Delete("IzbrisiRadnju/:id")
     izbrisiRadnju(@Param("id", ParseIntPipe) id: number) {
         return this.radnjaService.obrisiRadnju(id);
     }
     
     @UseGuards(JwtAuthGuard)
     @Roles(Role.ADMIN)
     @Put("DodajAutomobilURadnji/:idRadnje/:idAutomobila")
     dodajAutomobilURadnji(@Param("idRadnje",ParseIntPipe) idRadnje:number, @Param("idAutomobila",ParseIntPipe) idAutomobila:number) {
         return this.radnjaService.dodajAutomobilURadnji(idRadnje,idAutomobila);
     } 
}
