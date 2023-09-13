import { Admin } from "src/models/admin";

export class AdminDto {
     constructor(admin:Admin){
          this.id = admin.id;
          this.email = admin.email;
          this.lozinka = admin.lozinka;
     }
     id: number;
     email: string;
     lozinka: string;
}