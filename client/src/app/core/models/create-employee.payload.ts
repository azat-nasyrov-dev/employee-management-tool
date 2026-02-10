import { Office } from './office.enum';

export interface CreateEmployeePayload {
  firstName: string;
  lastName: string;
  office: Office;
  dateOfBirth: string;
  phoneNumber: string;
  tags?: string[];
}
