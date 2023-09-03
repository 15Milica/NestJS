import { type } from "os";
import { Automobil } from "./automobil";
import { Korisnik } from "./korisnik";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity("Like")
export class Like{
     @PrimaryGeneratedColumn()
     id: number;

     @ManyToOne(type=>Automobil, automobil=>automobil.likes)
     automobil: Automobil;

     @ManyToOne(type=>Korisnik, korisnik=>korisnik.likes)
     korisnik: Korisnik;
}