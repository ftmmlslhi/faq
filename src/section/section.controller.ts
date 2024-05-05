import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { Prisma } from '@prisma/client';
import { CreateSectionDto } from './dto/create-section.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('section')
@UseGuards(AuthGuard)
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  create(@Body() SectionCreateInput: CreateSectionDto, @Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin') {
      return this.sectionService.create(SectionCreateInput);
    } else {
      return 'access denied!';
    }
  }

  @Get()
  findAll(@Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin' || 'user') {
      return this.sectionService.findAll();
    } else {
      return 'access denied!';
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin' || 'user') {
      return this.sectionService.findOne(+id);
    } else {
      return 'access denied!';
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() sectionUpdateInput: Prisma.SectionUpdateInput,
    @Body() body: any,
  ) {
    let userRole = body.Payload.role;
    if (userRole === 'admin') {
      return this.sectionService.update(+id, sectionUpdateInput);
    } else {
      return 'access denied!';
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin') {
      return this.sectionService.remove(+id);
    } else {
      return 'access denied!';
    }
  }
}
