import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument, TagType } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);

  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: Model<TagDocument>,
  ) {}

  /**
   * Creates a new tag.
   *
   * @param dto Tag creation payload
   * @returns Created tag
   * @throws HttpException if validation fails or tag already exists
   */
  public async createTag(dto: CreateTagDto): Promise<Tag> {
    try {
      if (dto.type === 'negative' && isNaN(Number(dto.externalId))) {
        throw new HttpException(
          'externalId must be a number for negative tags',
          HttpStatus.BAD_REQUEST,
        );
      }

      const exists = await this.tagModel.findOne({
        type: dto.type,
        externalId: dto.externalId,
      });

      if (exists) {
        this.logger.warn(
          `Attempt to create duplicate tag [type=${dto.type}, externalId=${dto.externalId}]`,
        );
        throw new HttpException(
          `Tag with externalId ${dto.externalId} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdTag = await this.tagModel.create(dto);
      this.logger.log(
        `Tag created [id=${createdTag.id}, type=${dto.type}, externalId=${dto.externalId}]`,
      );

      return createdTag;
    } catch (err) {
      this.logger.error('Error creating tag', err);
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('Failed to create tag', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Returns all tags, optionally filtered by type.
   *
   * @param type Optional tag type filter
   * @returns List of tags
   */
  public async findAllTags(type?: TagType): Promise<Tag[]> {
    try {
      const tags = await this.tagModel.find(type ? { type } : {}).exec();
      this.logger.log(`Fetched ${tags.length} tags${type ? ` [type=${type}]` : ''}`);

      return tags;
    } catch (err) {
      this.logger.error('Error fetching tags', err);
      throw new HttpException('Failed to fetch tags', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Finds a tag by its ID.
   *
   * @param id Tag identifier
   * @returns Found tag
   * @throws HttpException if tag does not exist
   */
  public async findTagById(id: string): Promise<Tag> {
    try {
      const tag = await this.tagModel.findById(id).exec();
      if (!tag) {
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }

      this.logger.log(`Fetched tag [id=${id}]`);
      return tag;
    } catch (err) {
      this.logger.error(`Error fetching tag with id ${id}`, err);
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('Failed to fetch tag', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Updates an existing tag by its ID.
   *
   * @param id Tag identifier
   * @param dto Update payload
   * @returns Updated tag
   * @throws HttpException if tag does not exist
   */
  public async updateTagById(id: string, dto: UpdateTagDto): Promise<Tag> {
    try {
      const tag = await this.tagModel
        .findByIdAndUpdate(id, dto, {
          new: true,
        })
        .exec();

      if (!tag) {
        this.logger.warn(`Attempt to update non-existing tag [id=${id}]`);
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }

      this.logger.log(`Tag updated [id=${id}]`);
      return tag;
    } catch (err) {
      this.logger.error(`Error updating tag ${id}`, err);
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('Failed to update tag', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Removes a tag by its ID.
   *
   * @param id Tag identifier
   * @throws HttpException if tag does not exist
   */
  public async removeTagById(id: string): Promise<void> {
    try {
      const result = await this.tagModel.findByIdAndDelete(id).exec();
      if (!result) {
        this.logger.warn(`Attempt to delete non-existing tag id=${id}`);
        throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
      }

      this.logger.log(`Tag deleted [id=${id}]`);
    } catch (err) {
      this.logger.error(`Error deleting tag ${id}`, err);
      if (err instanceof HttpException) {
        throw err;
      }

      throw new HttpException('Failed to delete tag', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
