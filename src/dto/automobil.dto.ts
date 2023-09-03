import { Automobil } from "src/models/automobil";
import { SlikaAutomobila } from "src/models/slikaAutomobila";

export class AutomobilDto
{
   constructor(automobil:Automobil){
      this.id = automobil.id;
      this.marka = automobil.marka;
      this.model = automobil.model;
      this.godina = automobil.godina;
      this.specifikacije = automobil.specifikacije;
      this.cena = automobil.cena;
      if(automobil.slike!=undefined) this.slike = automobil.slike;
   }
   id: number;
   marka: string;
   model: string;
   godina: number;
   specifikacije: string;
   cena: number;
   slike: SlikaAutomobila[];
}
