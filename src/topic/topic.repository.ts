import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TopicRepository {
  constructor(private readonly prisma: prismaService) {}

  async create(topicCreateInput: CreateTopicDto) {
    try {
      return this.prisma.topic.create({
        data: {
          name: topicCreateInput.name,
          Section_Topic: {
            create: {
              Section: {
                connect: {
                  id: topicCreateInput.Section_Topic,
                },
              },
            },
          },
          questionAnswer_Topic: {
            create: {
              questionAnswer: {
                connect: {
                  id: topicCreateInput.questionAnswer_Topic,
                },
              },
            },
          },
        },
        include: {
          Section_Topic: true,
          questionAnswer_Topic: true,
        },
      });
    } catch (error) {
      console.error('Error updating topic:', error);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.topic.findMany({});
  }

  async findOne(id: number) {
    try {
      return this.prisma.topic.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error('Error updating topic:', error);
      throw error;
    }
  }

  async update(id: number, topicUpdateInput: Prisma.TopicUpdateInput) {
    try {
      const res = await this.prisma.topic.update({
        data: {
          name: topicUpdateInput.name,
        },
        where: {
          id,
        },
      });
      return {
        message: 'updated successfully',
        data: res,
      };
    } catch (error) {
      console.error('Error updating topic:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const res = await this.prisma.topic.delete({
        where: {
          id,
        },
      });
      return {
        message: 'deleted successfully',
        data: res,
      };
    } catch (e) {
      console.error('Error updating topic:', e);
      throw e;
    }
  }
}
