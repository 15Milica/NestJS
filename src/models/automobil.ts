import { Iznajmljivanje } from "./iznajmljivanje";
import { Like } from "./like";
import { Radnja } from "./radnja";
import { SlikaAutomobila } from "./slikaAutomobila";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity("Automobil")
export class Automobil
{
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      unique:true,
      nullable: true
   })
   marka: string;
   
   @Column({
      unique:true,
      nullable: true
   })
   model: string;
   
   @Column()
   godina: number;

   @Column({
      unique:true,
      nullable: true
   })
   specifikacije: string;

   @Column()
   cena: number;

   @ManyToOne(type=>Radnja, radnja=>radnja.automobili)
   radnja: Radnja;

   @OneToMany(type=>Like, like=>like.automobil, { cascade:true,onDelete:"CASCADE"})
   likes: Like[];

   @OneToMany(type=>SlikaAutomobila, slikaAutomobila=>slikaAutomobila.automobil, {onDelete:"CASCADE"})
   slike: SlikaAutomobila[];

   @OneToMany(type=>Iznajmljivanje, iznajmljivanje=>iznajmljivanje.automobil)
   iznajmljivanja: Iznajmljivanje[] | undefined
}
