import { Automobil } from "./automobil";
import { Korisnik } from "./korisnik";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity("Iznajmljivanje")
export class Iznajmljivanje{

     @PrimaryGeneratedColumn()
     id: number;
     
     @Column()
     datum: Date;

     @Column()
     dana: number;

     @Column()
     zavrseno: boolean;

     @ManyToOne(type=> Korisnik, korisnik=> korisnik.iznajmljivanja)
     korisnik: Korisnik;

     @ManyToOne(type=>Automobil, automobil=>automobil.iznajmljivanja)
     automobil: Automobil;
}