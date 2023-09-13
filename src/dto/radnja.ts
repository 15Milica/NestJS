import { Radnja } from "src/models/radnja";

export class RadnjaDto{
     constructor(radnja:Radnja){
          this.id = radnja.id;
          this.naziv = radnja.naziv;
          this.adresa = radnja.adresa;
          this.telefon = radnja.telefon;
          this.slika = radnja.slika;
     }
     id: number;
     naziv: string;
     adresa: string;
     telefon: string;
     slika: string;
}