import { Office } from '../shared/office.enum';

export interface CreateEmployeePayload {
  firstName: string;
  lastName: string;
  office: Office;
  dateOfBirth: string;
  phoneNumber: string;
  tags: string[];
}

export interface UpdateEmployeePayload {
  firstName?: string;
  lastName?: string;
  office?: Office;
  dateOfBirth?: string;
  phoneNumber?: string;
  tags?: string[];
}
