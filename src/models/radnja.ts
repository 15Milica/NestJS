import { Automobil } from "./automobil"
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity("Radnja")
export class Radnja{

     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     naziv: string;

     @Column()
     adresa: string;

     @Column()
     telefon:string;

     @Column()
     slika:string;

     @OneToMany(type=>Automobil, automobil=>automobil.radnja)
     automobili: Automobil[];
}