import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { IznajmljivanjeService } from './iznajmljivanje.service';
import { IznajmljivanjeDto } from 'src/dto/iznajmljivanje.dto';

@Controller('iznajmljivanje')
export class IznajmljivanjeController {
     
     constructor(private iznajmljivanjeServic: IznajmljivanjeService) {}

    //@UseGuards(JwtAuthenticationGuard)
    @Get("preuzmiIznajmljivanjaKorisnikaKorisnik/:id")
    preuzmiIznajmljivanjaKorisnik(@Param("id",ParseIntPipe) id: number){
        return this.iznajmljivanjeServic.preuzmiIznajmljivanjaKorisnika(id);
    }

    //@UseGuards(JwtAuthenticationGuardRadnik)
    @Post("Dodaj")
    dodaj(@Body() iznajmljivanjeDto: IznajmljivanjeDto) {
        return this.iznajmljivanjeServic.dodajIznajmljivanje(iznajmljivanjeDto);
    }

    //@UseGuards(JwtAuthenticationGuardRadnik)
    @Put("Izmeni")
    izmeni(@Body() iznajmljivanjeDto: IznajmljivanjeDto) {
        return this.iznajmljivanjeServic.updateIznajmljivanje(iznajmljivanjeDto);
    }   
    
    //@UseGuards(JwtAuthenticationGuardRadnik)
    @Delete("Izbrisi/:id")
    izbrisi(@Param("id",ParseIntPipe) id: number) {
         this.iznajmljivanjeServic.izbirisiIznajmljivanje(id);
    }  


    //@UseGuards(JwtAuthenticationGuardRadnik)
    @Put("Zavrsi/:id")
    zavrsi(@Param("id",ParseIntPipe) id: number) {
         this.iznajmljivanjeServic.zavrsiIznajmljivanje(id);
    }  
}
