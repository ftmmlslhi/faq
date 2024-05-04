import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { SectionRepository } from './section.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class SectionService {

constructor(private readonly sectionRepository:SectionRepository){}

  create(SectionCreateInput: CreateSectionDto) {
    return this.sectionRepository.create(SectionCreateInput)
  } 

  findAll() {
    return this.sectionRepository.findAll();
  }

  findOne(id: number) {
    return this.sectionRepository.findOne(id);
  }

  update(id: number, sectionUpdateInput: Prisma.SectionUpdateInput) {
    return this.sectionRepository.update(id , sectionUpdateInput)
  }

  remove(id: number) {
    return this.sectionRepository.remove(id);
  }
}
