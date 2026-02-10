export enum TagType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}

export interface Tag {
  _id: string;
  type: TagType;
  name: string;
  color: string;
  externalId: string;
  createdAt?: string;
  updatedAt?: string;
}
