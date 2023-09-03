import { type } from "os";
import { Automobil } from "./automobil";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity("SlikeAutomobila")
export class SlikaAutomobila{

     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     url: string;

     @ManyToOne(type=>Automobil, autmobili=>autmobili.slike, { cascade: true, onDelete: 'CASCADE' })
     automobil: Automobil;
}