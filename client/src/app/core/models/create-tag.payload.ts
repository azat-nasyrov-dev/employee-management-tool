import { TagType } from './tag.type';

export interface CreateTagPayload {
  type: TagType;
  name: string;
  color: string;
  externalId: string;
}
