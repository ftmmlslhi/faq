import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Header } from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Prisma, Topic } from '@prisma/client';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  
  @Post()
  create(@Body() TopicCreateInput: CreateTopicDto) {
    return this.topicService.create(TopicCreateInput);
  }

  @Get()
  findAll() {
    return this.topicService.findAll();
  }
  
  @Get('sortby')
  topicSortBySec(@Query('sortBy') sortBy: 'asc' | 'desc' = 'asc'){
    return this.topicService.topicSortBySec(sortBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(+id);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() sectionUpdateInput: Prisma.TopicUpdateInput) {
    return this.topicService.update(+id, sectionUpdateInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicService.remove(+id);
  }
}
