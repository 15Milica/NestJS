import { Admin } from "src/models/admin";
import { Automobil } from "src/models/automobil";
import { Iznajmljivanje } from "src/models/iznajmljivanje";
import { Korisnik } from "src/models/korisnik";
import { Like } from "src/models/like";
import { Radnja } from "src/models/radnja";
import { SlikaAutomobila } from "src/models/slikaAutomobila";
import { ConnectionOptions } from "typeorm";

export const typeOrmConfig: ConnectionOptions ={ 
     type:'postgres',
     host:'localhost',
     port:5432,
     username:'postgres',
     password:'1234',
     entities:[Korisnik,Automobil,Radnja,Like,Iznajmljivanje,SlikaAutomobila, Admin],
     database:"postgres",
     synchronize:true
}