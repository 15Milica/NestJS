import { Module } from '@nestjs/common';
import { AuthAdminController } from './auth-admin.controller';
import { AuthAdminService } from './auth-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from 'src/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { AdminService } from 'src/admin/admin.service';
import { JwtStrategy } from '../jwtAdmin.strategy';
import { LocalStrategy } from '../loacalAdmin.strategy';
import { Admin } from 'src/models/admin';

@Module({
  imports:[TypeOrmModule.forFeature([Admin]),PassportModule,AdminModule,JwtModule.register({
    secret: jwtConstants.secretAdmin,
    signOptions: {
        expiresIn: "1h"
    }
  })],
  providers: [AuthAdminService,LocalStrategy,JwtStrategy,AdminService],
  controllers:[AuthAdminController]
})
export class AuthAdminModule {}
