import { Korisnik } from "src/models/korisnik";

export class KorisnikDto {
     constructor(korisnik:Korisnik){
          this.id = korisnik.id;
          this.ime = korisnik.ime;
          this.prezime = korisnik.prezime;
          this.email = korisnik.email;
          this.lozinka = korisnik.lozinka;
          this.brojTelefona = korisnik.brojTelefona;
          this.role = korisnik.role;
     }
     id: number;
     ime: string;
     prezime: string;
     email: string;
     lozinka: string;
     brojTelefona: number;
     role: string;
}
