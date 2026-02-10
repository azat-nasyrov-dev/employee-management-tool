import { Tag } from './tag.model';
import { Office } from './office.enum';

export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  office: Office;
  dateOfBirth: string;
  phoneNumber: string;
  tags: Tag[];
  createdAt?: string;
  updatedAt?: string;
}
