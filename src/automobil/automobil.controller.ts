import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AutomobilService } from './automobil.service';
import { AutomobilDto } from 'src/dto/automobil.dto';
import JwtAuthGuard from 'src/autentifikacija/jwtAuth.guard';
import { Role } from 'src/autentifikacija/Role/Role';
import { Roles } from 'src/autentifikacija/Role/roles.decorator';

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
    @Roles(Role.USER)
    @Get("SvaVozilaKorisnika/:id")
    preuzmiSvaVozilaKorisnika(@Param("id", ParseIntPipe) id: number){
        return this.automobilService.sviAutomobiliKorisnika(id)
    }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    @Post("Dodaj")
    dodajVozilo(@Body() automobilDto : AutomobilDto){
        return this.automobilService.dodajAutomobil(automobilDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    @Delete("Obrisi/:id")
    obrisiVozilo(@Param("id", ParseIntPipe) id: number) {
        this.automobilService.obrisiAutomobil(id)
    }
}
