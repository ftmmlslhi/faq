import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SectionService } from './section.service';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Prisma } from '@prisma/client';
import { CreateSectionDto } from './dto/create-section.dto';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  create(@Body() SectionCreateInput: CreateSectionDto) {
    return this.sectionService.create(SectionCreateInput);
  }

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSectionDto: Prisma.SectionUpdateInput) {
    return this.sectionService.update(+id, updateSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(+id);
  }
}