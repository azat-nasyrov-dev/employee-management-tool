import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tag } from '../../tags/schemas/tag.schema';

export type EmployeeDocument = Employee & Document;
export enum Office {
  RIGA = 'RIGA',
  TALLINN = 'TALLINN',
  VILNIUS = 'VILNIUS',
}

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, enum: Office })
  office: Office;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true, trim: true })
  phoneNumber: string;

  /**
   * Reference to tags
   */
  @Prop({
    type: [{ type: Types.ObjectId, ref: Tag.name }],
    default: [],
  })
  tags: Types.ObjectId[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

/**
 * Compound index for frequent searches
 */
EmployeeSchema.index({ lastName: 1, firstName: 1 });
