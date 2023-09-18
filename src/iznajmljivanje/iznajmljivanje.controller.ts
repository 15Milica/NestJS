import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { IznajmljivanjeService } from './iznajmljivanje.service';
import { IznajmljivanjeDto } from 'src/dto/iznajmljivanje.dto';
import JwtAuthGuard from 'src/autentifikacija/jwtAuth.guard';
import JwtAuthGuardAdmin from 'src/autentifikacija-admin/jwtAuthAdmin.guard';
@Controller('iznajmljivanje')
export class IznajmljivanjeController {
     
    constructor(private iznajmljivanjeServic: IznajmljivanjeService) {}

    @UseGuards(JwtAuthGuard)
    @Get("preuzmiIznajmljivanjaKorisnikaKorisnik/:id")
    preuzmiIznajmljivanjaKorisnik(@Param("id",ParseIntPipe) id: number){
        return this.iznajmljivanjeServic.preuzmiIznajmljivanjaKorisnika(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("Dodaj")
    dodaj(@Body() iznajmljivanjeDto: IznajmljivanjeDto) {
        return this.iznajmljivanjeServic.dodajIznajmljivanje(iznajmljivanjeDto);
    }

    @UseGuards(JwtAuthGuardAdmin)
    @Put("Izmeni")
    izmeni(@Body() iznajmljivanjeDto: IznajmljivanjeDto) {
        return this.iznajmljivanjeServic.updateIznajmljivanje(iznajmljivanjeDto);
    }   
    
    @UseGuards(JwtAuthGuard)
    @Delete("Izbrisi/:id")
    izbrisi(@Param("id",ParseIntPipe) id: number) {
         this.iznajmljivanjeServic.izbirisiIznajmljivanje(id);
    }  

    @UseGuards(JwtAuthGuard)
    @Put("Zavrsi/:id")
    zavrsi(@Param("id",ParseIntPipe) id: number) {
         this.iznajmljivanjeServic.zavrsiIznajmljivanje(id);
    }  
}
