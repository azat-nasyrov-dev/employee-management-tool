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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ enum: Office, example: Office.TALLINN })
  @IsNotEmpty()
  @IsEnum(Office)
  readonly office: Office;

  @ApiProperty({ example: '1995-01-01' })
  @IsNotEmpty()
  @IsDateString()
  readonly dateOfBirth: string;

  @ApiProperty({ example: '+37258034696' })
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  /**
   * List of tag IDs
   */
  @ApiPropertyOptional({
    type: [String],
    description: 'List of tag IDs',
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly tags?: string[];
}
