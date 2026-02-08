import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { TagType } from '../schemas/tag.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ enum: ['positive', 'negative'] })
  @IsIn(['positive', 'negative'])
  readonly type: TagType;

  @ApiProperty({ example: 'Team player' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'green' })
  @IsNotEmpty()
  @IsString()
  readonly color: string;

  /**
   * Business external ID.
   * For positive - string
   * For negative - number (but comes as a string from HTTP)
   */
  @ApiProperty({
    description:
      'Business external ID. For positive tags - string, for negative tags - number (sent as string)',
    oneOf: [
      { type: 'string', example: 'POS-001' },
      { type: 'number', example: 1001 },
    ],
  })
  @IsNotEmpty()
  @IsString()
  readonly externalId: string;
}
