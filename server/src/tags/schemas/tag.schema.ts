import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagType = 'positive' | 'negative';
export type TagDocument = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
  @Prop({ required: true, enum: ['positive', 'negative'], index: true })
  type: TagType;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;

  /**
   * Business external ID
   * Stored as string for consistency
   */
  @Prop({ required: true, type: String })
  externalId: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);

/**
 * Compound index for fast lookup & uniqueness
 */
TagSchema.index({ type: 1, externalId: 1 }, { unique: true });
