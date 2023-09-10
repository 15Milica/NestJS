import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { IznajmljivanjeService } from './iznajmljivanje.service';
import { IznajmljivanjeDto } from 'src/dto/iznajmljivanje.dto';
import JwtAuthGuard from 'src/autentifikacija/jwtAuth.guard';
import { Role } from 'src/autentifikacija/Role/Role';
import { Roles } from 'src/autentifikacija/Role/roles.decorator';

@Controller('iznajmljivanje')
export class IznajmljivanjeController {
     
    constructor(private iznajmljivanjeServic: IznajmljivanjeService) {}

    @UseGuards(JwtAuthGuard)
    @Roles(Role.USER)
    @Get("preuzmiIznajmljivanjaKorisnikaKorisnik/:id")
    preuzmiIznajmljivanjaKorisnik(@Param("id",ParseIntPipe) id: number){
        return this.iznajmljivanjeServic.preuzmiIznajmljivanjaKorisnika(id);
    }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    @Post("Dodaj")
    dodaj(@Body() iznajmljivanjeDto: IznajmljivanjeDto) {
        return this.iznajmljivanjeServic.dodajIznajmljivanje(iznajmljivanjeDto);
    }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    @Put("Izmeni")
    izmeni(@Body() iznajmljivanjeDto: IznajmljivanjeDto) {
        return this.iznajmljivanjeServic.updateIznajmljivanje(iznajmljivanjeDto);
    }   
    
    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    @Delete("Izbrisi/:id")
    izbrisi(@Param("id",ParseIntPipe) id: number) {
         this.iznajmljivanjeServic.izbirisiIznajmljivanje(id);
    }  

    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    @Put("Zavrsi/:id")
    zavrsi(@Param("id",ParseIntPipe) id: number) {
         this.iznajmljivanjeServic.zavrsiIznajmljivanje(id);
    }  
}
