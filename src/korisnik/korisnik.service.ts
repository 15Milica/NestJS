import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KorisnikDto } from 'src/dto/korisnik.dto';
import { Korisnik } from 'src/models/korisnik';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class KorisnikService {
     constructor(@InjectRepository(Korisnik) private korisnikRepository: Repository<Korisnik>){}
 
     async preuzmiPrekoEmail(email: string) {
         const korisnik = await this.korisnikRepository.findOne({ where: {email} });
         if (korisnik) {
         return korisnik;
         }
         throw new HttpException('Korisnik sa ovim e-mailom ne postoji', HttpStatus.NOT_FOUND);
     }
 
     async kreirajKorisnika(korisnikDto: KorisnikDto) {
         const noviKorisnik = await this.korisnikRepository.create(korisnikDto);
         await this.korisnikRepository.save(noviKorisnik);
         return new KorisnikDto(noviKorisnik);
     }
 
     async preuzmiPrekoId(id: number) {
         const korisnik = await this.korisnikRepository.findOne({ where:{id} });
         if (korisnik) {
           return korisnik;
         }
         throw new HttpException('Korisnik sa tim id-em ne postoji.', HttpStatus.NOT_FOUND);
       }
 
     async promeniLozinku(email:string, staraLozinka:string, novaLozinka: string) {
         const korisnik = await this.korisnikRepository.findOne({where: {email: email}});
 
         if(await bcrypt.compare(staraLozinka, korisnik.lozinka)) {
             korisnik.lozinka = await bcrypt.hash(novaLozinka, 10);
             await this.korisnikRepository.save(korisnik);
         }
         else throw new HttpException("Netacna stara lozinka.",HttpStatus.UNAUTHORIZED)
     }
 
     async PretraziKorisnike(email:string) {
         let korisnici = await this.korisnikRepository.createQueryBuilder("korisnik")
                         .where("korisnik.email like :email",{email: `%${email}%`})
                         .getMany();
         return korisnici;
     }
}
