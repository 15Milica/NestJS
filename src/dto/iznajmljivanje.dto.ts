import { Iznajmljivanje } from "src/models/iznajmljivanje";

export class IznajmljivanjeDto{

     constructor(iznajmljivanje:Iznajmljivanje){
          this.id = iznajmljivanje.id;
          this.datum = iznajmljivanje.datum;
          this.dana = iznajmljivanje.dana;
          this.korisnikId = iznajmljivanje.korisnik.id;
          this.autmobilId = iznajmljivanje.automobil.id;
     }
    
     id: number;
     datum: Date;
     dana: number;
     zavrseno: boolean;
     korisnikId: number;
     autmobilId: number;
}