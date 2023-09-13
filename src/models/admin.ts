import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity("Admin")
export class Admin {

     @PrimaryGeneratedColumn()
     id: number;

     @Column({
          unique:true,
          nullable: false
     })
     email: string;

     @Column()
     lozinka: string;
}
