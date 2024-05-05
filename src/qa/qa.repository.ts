import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { CreateQaDto } from './dto/create-qa.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class QaRepository {
  constructor(private readonly prisma: prismaService) {}

  async create(qaCreateInput: CreateQaDto) {
    try {
      return this.prisma.questionAnswer.create({
        data: {
          question: qaCreateInput.question,
          answer: qaCreateInput.answer,
          draft_status: qaCreateInput.draft_status,
          public_status: qaCreateInput.public_status,
          questionAnswer_Topic: {
            create: {
              Topic: {
                connect: {
                  id: qaCreateInput.questionAnswer_Topic,
                },
              },
            },
          },
        },
        include: {
          questionAnswer_Topic: true,
        },
      });
    } catch (error) {
      console.error('Error updating qa:', error);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.questionAnswer.findMany({});
  }

  async findOne(id: number) {
    try {
      return this.prisma.questionAnswer.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error('Error updating qa:', error);
      throw error;
    }
  }

  async qaSortBytopic(sortOrder: 'asc' | 'desc' = 'asc') {
    return await this.prisma.questionAnswer_Topic.findMany({
      select: {
        questionAnswer: {
          select: {
            id: true,
            question: true,
            answer: true,
            dislike_count:true,
            like_count:true,
            public_status: true,
            draft_status:true
          },
        },
        topic_id: true,
      },
      orderBy: {
        topic_id: sortOrder,
      },
    });
  }

  async update(id: number, qaUpdateInput: Prisma.questionAnswerUpdateInput) {
    try {
      const res = await this.prisma.questionAnswer.update({
        data: {
          question: qaUpdateInput.question,
          answer: qaUpdateInput.answer,
          draft_status: qaUpdateInput.draft_status,
          public_status: qaUpdateInput.public_status,
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
      console.error('Error updating qa:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const res = await this.prisma.questionAnswer.delete({
        where: {
          id,
        },
      });
      return {
        message: 'deleted successfully',
        data: res,
      };
    } catch (e) {
      console.error('Error updating qa:', e);
      throw e;
    }
  }
}
