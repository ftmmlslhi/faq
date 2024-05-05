import { Injectable } from '@nestjs/common';
import { CreateQaDto } from './dto/create-qa.dto';
import { Prisma } from '@prisma/client';
import { QaRepository } from './qa.repository';
import { SearchAnswerDto } from './dto/SearchAnswer.dto';

@Injectable()
export class QaService {
  constructor(private readonly qaRepository:QaRepository){}

  create(QaCreateInput: CreateQaDto) {
    return this.qaRepository.create(QaCreateInput)
  } 
  searchAnswer(searchAnswer: SearchAnswerDto) {
    return this.qaRepository.searchAnswer(searchAnswer)
  } 

  findAll() {
    return this.qaRepository.findAll();
  }

  findOne(id: number) {
    return this.qaRepository.findOne(id);
  }

  async qaSortBytopic(sortBy: 'asc' | 'desc' = 'asc'){
    return this.qaRepository.qaSortBytopic(sortBy)
  }

  
  async PopularQa(sortBy: 'asc' | 'desc' = 'asc'){
    return this.qaRepository.PopularQa(sortBy)
  }

  update(id: number, qaUpdateInput: Prisma.questionAnswerUpdateInput) {
    return this.qaRepository.update(id , qaUpdateInput)
  }

  remove(id: number) {
    return this.qaRepository.remove(id);
  }
}
