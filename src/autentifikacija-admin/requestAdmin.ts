import { Request } from 'express';
import { Admin } from 'typeorm';

 
interface RequestSaAdminom extends Request {
  admin: Admin;
}

export default RequestSaAdminom;