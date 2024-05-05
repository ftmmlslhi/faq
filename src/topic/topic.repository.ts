import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Prisma, Topic } from '@prisma/client';

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
    return this.prisma.topic.findMany({
      include: {
        Section_Topic: {
          select: {
            Section: true,
          },
        },
        questionAnswer_Topic: {
          select: {
            questionAnswer: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    try {
      return this.prisma.topic.findUnique({
        where: {
          id,
        },
        include: {
          Section_Topic: {
            select: {
              Section: true,
            },
          },
          questionAnswer_Topic: {
            select: {
              questionAnswer: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error updating topic:', error);
      throw error;
    }
  }

  async topicSortBySec(sortOrder: 'asc' | 'desc' = 'asc') {
    return await this.prisma.section_Topic.findMany({
      select:{
        Topic :{
          select: {
            id: true,
            name: true,
          },
        },
        section_id: true
      },
      orderBy: {
        section_id: sortOrder,
      },
    });
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
