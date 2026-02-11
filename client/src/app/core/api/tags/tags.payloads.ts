import { TagType } from './tag-type.enum';

export interface CreateTagPayload {
  type: TagType;
  name: string;
  color: string;
  externalId: string;
}

export interface UpdateTagPayload {
  name?: string;
  color?: string;
  externalId?: string;
}
