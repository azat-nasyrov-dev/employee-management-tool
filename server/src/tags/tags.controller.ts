import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag, TagType } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({
    status: 201,
    description: 'Tag successfully created',
    type: Tag,
  })
  @Post()
  public async createTag(@Body() dto: CreateTagDto): Promise<Tag> {
    return await this.tagsService.createTag(dto);
  }

  @ApiOperation({ summary: 'Get all tags' })
  @ApiQuery({
    name: 'type',
    enum: ['positive', 'negative'],
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'List of tags',
    type: [Tag],
  })
  @Get()
  public async findAllTags(@Query('type') type?: TagType): Promise<Tag[]> {
    return await this.tagsService.findAllTags(type);
  }

  @ApiOperation({ summary: 'Get tag by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Tag found',
    type: Tag,
  })
  @ApiResponse({
    status: 404,
    description: 'Tag not found',
  })
  @Get(':id')
  public async findTagById(@Param('id') id: string): Promise<Tag> {
    return await this.tagsService.findTagById(id);
  }

  @ApiOperation({ summary: 'Update tag by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Tag successfully updated',
    type: Tag,
  })
  @Patch(':id')
  public async updateTagById(@Param('id') id: string, @Body() dto: UpdateTagDto): Promise<Tag> {
    return await this.tagsService.updateTagById(id, dto);
  }

  @ApiOperation({ summary: 'Delete tag by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 404,
    description: 'Tag successfully deleted',
  })
  @Delete(':id')
  public async removeTagById(@Param('id') id: string): Promise<void> {
    return await this.tagsService.removeTagById(id);
  }
}
