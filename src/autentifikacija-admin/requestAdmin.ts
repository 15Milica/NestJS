import { Request } from 'express';
import { Admin } from 'src/models/admin';

 
interface RequestSaAdminom extends Request {
  admin: Admin;
}

export default RequestSaAdminom;