import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RadnjaDto } from 'src/dto/radnja';
import { Automobil } from 'src/models/automobil';
import { Radnja } from 'src/models/radnja';
import { Repository } from 'typeorm';

@Injectable()
export class RadnjaService {
     constructor(@InjectRepository(Radnja) private radnjaRepository: Repository<Radnja>,
     @InjectRepository(Automobil) private automobilRepository: Repository<Automobil>
     ){}

     async preuzmiRadnje() {          
          return this.radnjaRepository.find();
     }

     async dodajRadnju(radnjaDto: RadnjaDto) {
          let radnja = this.radnjaRepository.create(radnjaDto);
          await this.radnjaRepository.save(radnja);
          return new RadnjaDto(radnja);
     }

     async obrisiRadnju(id: number) {
          this.radnjaRepository.delete(id);
     }

     async izmeniRadnju(radnjaDto: RadnjaDto) { 
          const radnja = await this.radnjaRepository.findOne({ where: { id: radnjaDto.id } });
          
          if (!radnja) {
          throw new HttpException("Ne postoji radnja sa datim ID-om.", HttpStatus.NOT_FOUND);
          }
          
          await this.radnjaRepository.update(radnjaDto.id, radnjaDto);
          return radnjaDto; 
     }

     async dodajAutomobilURadnji(idRadnje: number, idAutomobila: number){
          let radnja = await this.radnjaRepository.findOne({where:{id:idRadnje}});
          if(!radnja) throw new HttpException("Nema te radnje.",HttpStatus.NOT_FOUND);
          
          let automobil = await this.automobilRepository.findOne({where:{id:idAutomobila}})
          if(!automobil) throw new HttpException("Nema tog automobila.",HttpStatus.NOT_FOUND);
          automobil.radnja = radnja;
          await this.automobilRepository.update(automobil.id, automobil);
     }
}
