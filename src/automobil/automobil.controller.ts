import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AutomobilService } from './automobil.service';
import { AutomobilDto } from 'src/dto/automobil.dto';
import JwtAuthGuard from 'src/autentifikacija/jwtAuth.guard';
import JwtAuthGuardAdmin from 'src/autentifikacija-admin/jwtAuthAdmin.guard';

@Controller('automobil')
export class AutomobilController {
    constructor(private automobilService: AutomobilService){}

    @Get("SviAutomobili")
    preuzmiSveAutomobile() {
        return this.automobilService.preuzmiSveAutomobile();
    }

    @Get("Detaljno/:id")
    preuzmiDetalje(@Param("id", ParseIntPipe) id:number) {
        return this.automobilService.detaljno(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get("SvaVozilaKorisnika/:id")
    preuzmiSvaVozilaKorisnika(@Param("id", ParseIntPipe) id: number){
        return this.automobilService.sviAutomobiliKorisnika(id)
    }

    @UseGuards(JwtAuthGuardAdmin)
    @Post("Dodaj")
    dodajVozilo(@Body() automobilDto : AutomobilDto){
        return this.automobilService.dodajAutomobil(automobilDto);
    }
    
    @UseGuards(JwtAuthGuardAdmin)
    @Delete("Obrisi/:id")
    obrisiVozilo(@Param("id", ParseIntPipe) id: number) {
        this.automobilService.obrisiAutomobil(id)
    }
}
