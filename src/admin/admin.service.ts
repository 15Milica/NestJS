import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminDto } from 'src/dto/admin.dto';
import { Admin } from 'src/models/admin';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
     constructor(@InjectRepository(Admin) private adminRepository : Repository<Admin>){}
     
     async addAdmin(adminDto:AdminDto) {

        let admin: Admin = new Admin();
        admin.email = adminDto.email;
        admin = await this.adminRepository.save(admin);
        return new AdminDto(admin);
     }
     
     async preuzmiPrekoEmaila(email: string) {
        const admin = await this.adminRepository.findOne({where:{ email} });
        if (admin) return admin;
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
     }
     
     async preuzmiPrekoId(id: number) {
        let admin = await this.adminRepository.findOne({where: {id}})
        if (admin) return admin;
        throw new HttpException('Korisnik sa ovim idem ne postoji', HttpStatus.NOT_FOUND);
    }
}
