import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AutomobilService } from './automobil.service';
import { AutomobilDto } from 'src/dto/automobil.dto';

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
    
    //@UseGuards(JwtAuthenticationGuard)
    @Get("SvaVozilaKorisnika/:id")
    preuzmiSvaVozilaKorisnika(@Param("id", ParseIntPipe) id: number){
        return this.automobilService.sviAutomobiliKorisnika(id)
    }

    //@UseGuards(JwtAuthenticationGuardRadnik)
    @Get("PretragaSlobodna/:proizvodjac/:grad")
    pretragaSlobodna(@Param() params) {
        return this.automobilService.pretraziSlobodneAutomobile(params.grad,params.proizvodjac);
    }

    //@UseGuards(JwtAuthenticationGuardRadnik)
    @Post("Dodaj")
    dodajVozilo(@Body() automobilDto : AutomobilDto){
        return this.automobilService.dodajAutomobil(automobilDto);
    }
    
    //@UseGuards(JwtAuthenticationGuardRadnik)
    @Delete("Obrisi/:id")
    obrisiVozilo(@Param("id", ParseIntPipe) id: number) {
        this.automobilService.obrisiAutomobil(id)
    }
}
