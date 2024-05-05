import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { QaService } from './qa.service';
import { CreateQaDto } from './dto/create-qa.dto';
import { Prisma } from '@prisma/client';

@Controller('qa')
export class QaController {
  constructor(private readonly qaService: QaService) {}

  @Post()
  create(@Body() createQaDto: CreateQaDto) {
    return this.qaService.create(createQaDto);
  }

  @Get()
  findAll() {
    return this.qaService.findAll();
  }

  @Get('sortby')
  qaSortBytopic(@Query('sortBy') sortBy: 'asc' | 'desc' = 'asc'){
    return this.qaService.qaSortBytopic(sortBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateQaDto: Prisma.questionAnswerUpdateInput) {    
    return this.qaService.update(+id, updateQaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qaService.remove(+id);
  }
}
