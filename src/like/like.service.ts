import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Automobil } from 'src/models/automobil';
import { Korisnik } from 'src/models/korisnik';
import { Like } from 'src/models/like';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class LikeService {
     constructor(@InjectRepository(Like) private likeRepository: Repository<Like>,
                 @InjectRepository(Korisnik) private korisnikRepository: Repository<Korisnik>,
                 @InjectRepository(Automobil) private automobilRepository: Repository<Automobil>
     ){}

     async like(idAutomobila:number, idKorisnika:number){
          let like = await this.likeRepository.findOne({where:{automobil:{id: idAutomobila}, korisnik: {id: idKorisnika}}})
          if( like !== null ) throw new HttpException("Vec ste oznacili da vam se automobil svidja.",HttpStatus.BAD_REQUEST)
  
          like = new Like();
          let korisnik = await this.korisnikRepository.findOne({where: {id:idKorisnika}});
          let automobil = await this.automobilRepository.findOne({where:{id:idAutomobila}});
  
          if(korisnik == null) throw new HttpException("Korisnik ne postoji",HttpStatus.NOT_FOUND);
          if(automobil == null) throw new HttpException("Automobil ne postoji",HttpStatus.NOT_FOUND);
  
          like.korisnik = korisnik;
          like.automobil = automobil;
  
          like = await this.likeRepository.save(like);
  
          return like.id;
     }
     
     async brojLikova(idAutomobila:number){
          let automobil = await this.automobilRepository.findOne({where: {id:idAutomobila}, relations:["likes"]});
          if(automobil == null) throw new HttpException("Automobil ne postoji",HttpStatus.NOT_FOUND);

          if (automobil.likes == null) {
               return 0;
          } else {
               return automobil.likes.length;
          }
     }

     async deleteLike(idLike:number){
          let like = await this.likeRepository.findOne({where: {id:idLike}});
          if(like == null) throw new HttpException("Nema like", HttpStatus.NOT_FOUND);
          this.likeRepository.delete(like);
     }
     
     async korisnikLike(idKorisnika: number, idAutomobila: number){
          let like = await this.likeRepository.findOne({where: {automobil: {id:idAutomobila}, korisnik: {id:idKorisnika}}});
          if(like == null) return -1;
          else return like.id;
     }
}
