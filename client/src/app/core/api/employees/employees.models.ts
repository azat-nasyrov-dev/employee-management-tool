import { Tag } from '../tags/tags.models';
import { Office } from '../shared/office.enum';

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
