import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { Prisma } from '@prisma/client';
import { connect } from 'http2';

@Injectable()
export class SectionRepository {
  constructor(private readonly prisma: prismaService) {}

  async create(sectionCreateInput: Prisma.SectionCreateInput) {
    console.log('repo', sectionCreateInput);
    return this.prisma.section.create({
      data: {
        name : sectionCreateInput.name,
        draft_status: sectionCreateInput.draft_status,
        public_status:sectionCreateInput.public_status,
        Section_Topic :{
            create:{
                Topic : {
                    connect:{
                        id:1
                    }
                }}
           }
    },
    include: {
        Section_Topic: true,
      },
   })
  }

  async findAll() {
    return this.prisma.section.findMany({});
  }

  async findOne(id: number) {
    return this.prisma.section.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, sectionUpdateInput: Prisma.SectionUpdateInput) {
    try {
      const res = await this.prisma.section.update({
        data: {
          name: sectionUpdateInput.name,
          public_status: sectionUpdateInput.public_status,
          draft_status: sectionUpdateInput.draft_status,
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
      console.error('Error updating section:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const res = await this.prisma.section.delete({
        where: {
          id,
        },
      });
      return {
        message: 'deleted successfully',
        data: res,
      };
    } catch (e) {
      console.error('Error updating section:', e);
      throw e;
    }
  }
}
