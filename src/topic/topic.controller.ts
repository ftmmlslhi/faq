import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  Header,
  UseGuards,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Prisma, Topic } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('topic')
@UseGuards(AuthGuard)
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  create(@Body() TopicCreateInput: CreateTopicDto, @Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin') {
      return this.topicService.create(TopicCreateInput);
    } else {
      return 'access denied!';
    }
  }

  @Get()
  findAll(@Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin' || 'user') {
      return this.topicService.findAll();
    } else {
      return 'access denied!';
    }
  }

  @Get('sortby')
  topicSortBySec(@Query('sortBy') sortBy: 'asc' | 'desc' = 'asc',
    @Body() body: any,
  ) {
    let userRole = body.Payload.role;
    if (userRole === 'admin') {
      return this.topicService.topicSortBySec(sortBy);
    } else {
      return 'access denied!';
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin' || 'user') {
      return this.topicService.findOne(+id);
    } else {
      return 'access denied!';
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() sectionUpdateInput: Prisma.TopicUpdateInput,
    @Body() body: any,
  ) {
    let userRole = body.Payload.role;
    if (userRole === 'admin') {
      return this.topicService.update(+id, sectionUpdateInput);
    } else {
      return 'access denied!';
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin') {
      return this.topicService.remove(+id);
    } else {
      return 'access denied!';
    }
  }
}
