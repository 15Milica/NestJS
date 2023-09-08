import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IznajmljivanjeDto } from 'src/dto/iznajmljivanje.dto';
import { Automobil } from 'src/models/automobil';
import { Iznajmljivanje } from 'src/models/iznajmljivanje';
import { Korisnik } from 'src/models/korisnik';
import { Repository } from 'typeorm';

@Injectable()
export class IznajmljivanjeService {
     constructor(@InjectRepository(Iznajmljivanje) private iznajmljivanjeRepository: Repository<Iznajmljivanje>,
                 @InjectRepository(Korisnik) private korisnikRepository: Repository<Korisnik>,
                 @InjectRepository(Automobil) private automobilRepository: Repository<Automobil>,
     ){}

    async preuzmiIznajmljivanjaKorisnika(id: number) {
        let korisnik = await this.korisnikRepository.findOne({where:{id}, relations:["iznajmljivanja","iznajmljivanja.korisnik","iznajmljivanja.automobil"]});
        if(!korisnik) throw new HttpException("Nema tog korisnika",HttpStatus.NOT_FOUND);
        let iznajmljivanja = [];
        
        for(let i = 0 ; i < korisnik.iznajmljivanja.length;i++){
            let iznajmljivanje = korisnik.iznajmljivanja[i];
            let automobil = await this.automobilRepository.findOne({where:{id: iznajmljivanje.automobil.id}});
            
            iznajmljivanja.push({
                id: iznajmljivanje.id,
                datum: iznajmljivanje.datum,
                dana: iznajmljivanje.dana,
                zavrseno: iznajmljivanje.zavrseno,
                automobil: automobil.marka + " " + automobil.model + " " + automobil.specifikacije,
                cenaUkupna: automobil.cena * iznajmljivanje.dana
            });
        }
        return iznajmljivanja;
    }

    async dodajIznajmljivanje(iznajmljivanjeDto : IznajmljivanjeDto) {
        let iznajmljivanje = new Iznajmljivanje();
        let korisnik = await this.korisnikRepository.findOne({where: {id: iznajmljivanjeDto.korisnikId}});
        let automobil = await this.automobilRepository.findOne({where: {id: iznajmljivanjeDto.automobilId}, relations:["iznajmljivanja"]});
        if(!korisnik) throw new HttpException("Nema trazenog korisnika.",HttpStatus.NOT_FOUND);
        if(!automobil) throw new HttpException("Nema trazenog automobila.",HttpStatus.NOT_FOUND);

        automobil.iznajmljivanja.forEach(iznm=>{
            if(iznm.zavrseno == false) throw new HttpException("Ne moze da se iznajmi automobil koji nije vracen.",HttpStatus.UNAUTHORIZED);
        })

        iznajmljivanje.dana = iznajmljivanjeDto.dana;
        iznajmljivanje.datum = iznajmljivanjeDto.datum;
        iznajmljivanje.korisnik = korisnik;
        iznajmljivanje.automobil = automobil;
        iznajmljivanje.zavrseno = false;
        iznajmljivanje = await this.iznajmljivanjeRepository.save(iznajmljivanje);

        return new IznajmljivanjeDto(iznajmljivanje);    
    }

    async updateIznajmljivanje(iznajmljivanjeDto: IznajmljivanjeDto) {
        let iznajmljivanje = await this.iznajmljivanjeRepository.findOne({where:{id:iznajmljivanjeDto.id}});
        let korisnik = await this.korisnikRepository.findOne({where: {id:iznajmljivanjeDto.korisnikId}});
        let automobil = await this.automobilRepository.findOne({where: {id:iznajmljivanjeDto.automobilId},relations:["iznajmljivanja"]});
        if(!korisnik) throw new HttpException("Nema trazenog korisnika.",HttpStatus.NOT_FOUND);
        if(!automobil) throw new HttpException("Nema trazenog vozila.",HttpStatus.NOT_FOUND);

        automobil.iznajmljivanja.forEach(iznm=>{
            if(iznm.zavrseno == false) throw new HttpException("Ne moze da se iznajmi automobil koji nije vracen.",HttpStatus.UNAUTHORIZED);
        })

        iznajmljivanje.dana = iznajmljivanjeDto.dana;
        iznajmljivanje.datum = iznajmljivanjeDto.datum;
        iznajmljivanje.korisnik = korisnik;
        iznajmljivanje.automobil = automobil;
        iznajmljivanje.zavrseno = iznajmljivanjeDto.zavrseno;

        await this.iznajmljivanjeRepository.update(iznajmljivanje.id,iznajmljivanje);

        return new IznajmljivanjeDto(iznajmljivanje);        
    }

    async zavrsiIznajmljivanje(id: number) {
        let iznajmljivanje =await this.iznajmljivanjeRepository.findOne({where:{id}, relations:["vozilo"]});

        if(!iznajmljivanje) throw new HttpException("Nema tog iznajmljivanja",HttpStatus.NOT_FOUND);
        let automobil = await this.automobilRepository.findOne({where:{id:iznajmljivanje.automobil.id},relations:["voziloLogicko"]});
        iznajmljivanje.zavrseno = true;
        this.iznajmljivanjeRepository.update(id,iznajmljivanje);
        let rezultat = {
            id: iznajmljivanje.id,
            dana: iznajmljivanje.dana,
            datum: iznajmljivanje.datum,
            zavrseno:iznajmljivanje.zavrseno,
            automobil: automobil.marka + " " + automobil.model + " " + automobil.specifikacije
        }

        return rezultat
    }

    async izbirisiIznajmljivanje(id: number) {
        let iznajmljivanje =await this.iznajmljivanjeRepository.findOne({where:{id}});

        if(!iznajmljivanje) throw new HttpException("Nema tog iznajmljivanja",HttpStatus.NOT_FOUND);

        if(iznajmljivanje.zavrseno != true) throw new HttpException("Zavrsite iznajmljivanje",HttpStatus.NOT_FOUND);

        await this.iznajmljivanjeRepository.delete(id);
    }
}
