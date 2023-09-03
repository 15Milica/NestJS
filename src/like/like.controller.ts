import { Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {

     constructor(private likeService:LikeService){}

     @Post("DodajLike/:idAutomobila/:idKorisnika")
     dodajLike(@Param("idAutomobila", ParseIntPipe) idAutomobila: number, @Param("idKorisnika", ParseIntPipe) idKorisnika: number){
          return this.likeService.like(idAutomobila, idKorisnika);
     }

     @Get("AutomobilLike/:idAutomobila")
     automobilLike(@Param("idAutomobila",ParseIntPipe) idAutomobila: number){
         return this.likeService.brojLikova(idAutomobila);
     }

     @Delete("ObrisiLike/:idLike")
     obrisiLike(@Param("idLike", ParseIntPipe) idLike: number){
          return this.likeService.deleteLike(idLike);
     }

     @Get("KorisnikLikeAutomobil/:idKorisnika/:idAutomobila")
     korisnikLikeAuotmobil(@Param("idKorisnika", ParseIntPipe) idKorisnika: number, @Param ("idAutomobila", ParseIntPipe) idAutomobila: number){
          return this.likeService.korisnikLike(idKorisnika, idAutomobila);
     }
}
