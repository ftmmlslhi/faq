import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Prisma } from '@prisma/client';
import { TopicRepository } from './topic.repository';

@Injectable()
export class TopicService {
  constructor(private readonly topicRepository:TopicRepository){}

  create(TopicCreateInput: CreateTopicDto) {
    return this.topicRepository.create(TopicCreateInput)
  } 

  findAll() {
    return this.topicRepository.findAll();
  }

  findOne(id: number) {
    return this.topicRepository.findOne(id);
  }

  update(id: number, topicUpdateInput: Prisma.TopicUpdateInput) {
    return this.topicRepository.update(id , topicUpdateInput)
  }

  remove(id: number) {
    return this.topicRepository.remove(id);
  }
}
