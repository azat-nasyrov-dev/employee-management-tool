import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { TagType } from '../schemas/tag.schema';

export class CreateTagDto {
  @IsIn(['positive', 'negative'])
  readonly type: TagType;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly color: string;

  /**
   * Business external ID.
   * For positive - string
   * For negative - number (but comes as a string from HTTP)
   */
  @IsNotEmpty()
  @IsString()
  readonly externalId: string;
}
