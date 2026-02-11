import { TagType } from './tag-type.enum';

export interface Tag {
  _id: string;
  type: TagType;
  name: string;
  color: string;
  externalId: string;
  createdAt?: string;
  updatedAt?: string;
}
