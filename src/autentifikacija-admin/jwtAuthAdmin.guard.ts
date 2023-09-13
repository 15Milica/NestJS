import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
 
@Injectable()
export default class JwtAuthGuardAdmin extends AuthGuard('jwt-Admin') {}