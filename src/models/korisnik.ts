import { link } from "fs";
import { Iznajmljivanje } from "./iznajmljivanje"
import { Like } from "./like"
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { type } from "os";

@Entity("Korisnik")
export class Korisnik {

     @PrimaryGeneratedColumn()
     id: number;
     
     @Column({
          nullable: false
     })
     ime: string;

     @Column({
          nullable: false
     })
     prezime: string;

     @Column({
          unique:true,
          nullable: false
     })
     email: string;

     @Column({ nullable: false, unique: false })
     role: string;

     @Column()
     lozinka: string;

     brojTelefona: number;

     @OneToMany(type=>Like, like=>like.korisnik, {cascade:true, onDelete:"SET NULL"})
     likes: Like[]; 

     @OneToMany(type=>Iznajmljivanje, Iznajmljivanje=>Iznajmljivanje.korisnik)
     iznajmljivanja: Iznajmljivanje[];
}