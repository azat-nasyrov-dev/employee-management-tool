import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Office } from '../schemas/employee.schema';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEnum(Office)
  readonly office: Office;

  @IsNotEmpty()
  @IsDateString()
  readonly dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  /**
   * List of tag IDs
   */
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly tags?: string[];
}
