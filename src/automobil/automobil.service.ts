import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AutomobilDto } from 'src/dto/automobil.dto';
import { Automobil } from 'src/models/automobil';
import { Iznajmljivanje } from 'src/models/iznajmljivanje';
import { Korisnik } from 'src/models/korisnik';
import { Like } from 'src/models/like';
import { SlikaAutomobila } from 'src/models/slikaAutomobila';
import { Repository } from 'typeorm';

@Injectable()
export class AutomobilService {
     constructor(@InjectRepository(Automobil)  private automobilRepository: Repository<Automobil>,
                 @InjectRepository(Korisnik) private korisnikRepository: Repository<Korisnik>,
                 @InjectRepository(Iznajmljivanje) private iznajmnjivanjeRepository: Repository<Iznajmljivanje>,
                 @InjectRepository(SlikaAutomobila) private slikeRepository: Repository<SlikaAutomobila>,
                 @InjectRepository(Like) private likeRepository:Repository<Like>) {}

    preuzmiSveAutomobile() {
        return this.automobilRepository.find({relations:["slike", "radnja", "likes"]});
    }

    async pretraziSlobodneAutomobile(grad: string, proizvodjac:string) {
        let automobil = await this.automobilRepository.find({relations:["slike","radnja","iznajmljivanja"]})
        let slobodna:Automobil[] = []

        slobodna = slobodna.filter(v=>v.radnja != null);
        slobodna = slobodna.filter(v=>{
            for(let i = 0; i < v.iznajmljivanja.length;i++) {
                if(!v.iznajmljivanja[i].zavrseno) return false;
            }
            return true;
        });

        return slobodna
    }

    async dodajAutomobil(automobilDto: AutomobilDto) {
        let automobil = this.automobilRepository.create(automobilDto);

        let autmobilSaIstomOznakom = await this.automobilRepository.findOne({where:{specifikacije: automobilDto.specifikacije}})
        
        if(autmobilSaIstomOznakom) throw new HttpException("Vec postoji sa istom oznakom",HttpStatus.UNAUTHORIZED);
        automobil = await this.automobilRepository.save(automobil);
       
        let slika = this.slikeRepository.create(automobil.slike[0]); 
        slika.automobil = automobil
        slika = await this.slikeRepository.save(slika);
        
        return new AutomobilDto(automobil);
    }

    async detaljno(id: number) {
        let vozilo = await this.automobilRepository.findOne({where:{id}, relations: ["radnja","slike"]});
        if(vozilo === null) throw new HttpException("Nema tog vozila",HttpStatus.NOT_FOUND);
        return vozilo;
    }

    async sviAutomobiliKorisnika(idKorisnik: number){
        let korisnik = await this.korisnikRepository.findOne({where:{id:idKorisnik},relations: ["iznajmljivanja"]}) 
        if(!korisnik) throw new HttpException("Nema tog korisnika.",HttpStatus.NOT_FOUND);

        let idsAutomobila = [];
        for(let i = 0; i < korisnik.iznajmljivanja.length; i++) {
            let iznajmljivanje = await this.iznajmnjivanjeRepository.findOne({where:{id:korisnik.iznajmljivanja[i].id}, relations:["automobil"]})
            idsAutomobila.push(iznajmljivanje.automobil.id)
        }
        return idsAutomobila;
    } 

    async obrisiAutomobil(id: number) {
        let automobil = await this.automobilRepository.findOne({where:{id},relations:["slike","likes","iznajmljivanja"]})
       
        for(let i = 0; i < automobil.slike.length;i++){
            await this.slikeRepository.delete(automobil.slike[i].id)
        }

        for(let i = 0; i < automobil.likes.length;i++){
            await this.likeRepository.delete(automobil.likes[i].id)
        }

        for(let i = 0; i < automobil.iznajmljivanja.length;i++){
            await this.iznajmnjivanjeRepository.delete(automobil.iznajmljivanja[i].id)
        }
     
        await this.automobilRepository.delete(id);
    }
}
