import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import JwtAuthGuardAdmin from 'src/autentifikacija-admin/jwtAuthAdmin.guard';
import { AdminDto } from 'src/dto/admin.dto';

@Controller('admin')
export class AdminController {
     constructor(private adminService: AdminService) {}

     @UseGuards(JwtAuthGuardAdmin)
     @Get(":id")
     getAdmin(@Param("id", ParseIntPipe) id: number){ 
         return this.adminService.preuzmiPrekoId(id);
     }
 
     @UseGuards(JwtAuthGuardAdmin)
     @Post("Dodaj")
     async postAdmin(@Body() admin: AdminDto) {
         return await this.adminService.addAdmin(admin);
     }
 
     @UseGuards(JwtAuthGuardAdmin)
     @Get("pretrazi/:email")
     pretraziAdmine(@Param() {email}){
         return this.adminService.preuzmiPrekoEmaila(email);
     }
}
