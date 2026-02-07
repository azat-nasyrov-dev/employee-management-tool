import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag, TagType } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public async createTag(@Body() dto: CreateTagDto): Promise<Tag> {
    return await this.tagsService.createTag(dto);
  }

  @Get()
  public async findAllTags(@Query('type') type?: TagType): Promise<Tag[]> {
    return await this.tagsService.findAllTags(type);
  }

  @Get(':id')
  public async findTagById(@Param('id') id: string): Promise<Tag> {
    return await this.tagsService.findTagById(id);
  }

  @Patch(':id')
  public async updateTagById(@Param('id') id: string, @Body() dto: UpdateTagDto): Promise<Tag> {
    return await this.tagsService.updateTagById(id, dto);
  }

  @Delete(':id')
  public async removeTagById(@Param('id') id: string): Promise<void> {
    return await this.tagsService.removeTagById(id);
  }
}
