import { Injectable } from '@nestjs/common';
import { CreateQaDto } from './dto/create-qa.dto';
import { Prisma } from '@prisma/client';
import { QaRepository } from './qa.repository';

@Injectable()
export class QaService {
  constructor(private readonly qaRepository:QaRepository){}

  create(QaCreateInput: CreateQaDto) {
    return this.qaRepository.create(QaCreateInput)
  } 

  findAll() {
    return this.qaRepository.findAll();
  }

  findOne(id: number) {
    return this.qaRepository.findOne(id);
  }

  update(id: number, qaUpdateInput: Prisma.questionAnswerUpdateInput) {
    return this.qaRepository.update(id , qaUpdateInput)
  }

  remove(id: number) {
    return this.qaRepository.remove(id);
  }
}
