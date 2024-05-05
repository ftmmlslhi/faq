import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { QaService } from './qa.service';
import { CreateQaDto } from './dto/create-qa.dto';
import { Prisma } from '@prisma/client';
import { SearchAnswerDto } from './dto/SearchAnswer.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('qa')
@UseGuards(AuthGuard)
export class QaController {
  constructor(private readonly qaService: QaService) {}

  @Post()
  create(@Body() createQaDto: CreateQaDto, @Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin') {
      return this.qaService.create(createQaDto);
    } else {
      return 'access denied!';
    }
  }

  @Post('searchAnswer')
  searchAnswer(@Body() searchAnswerDto: SearchAnswerDto, @Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin'||'user') {
      return this.qaService.searchAnswer(searchAnswerDto);
    } else {
      return 'access denied!';
    }
  }

  @Get()
  findAll(@Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin' || 'user') {
      return this.qaService.findAll();
    } else {
      return 'access denied!';
    }
  }

  @Get('Popular')
  PopularQa(
    @Query('sortBy') sortBy: 'asc' | 'desc' = 'asc',
    @Body() body: any,
  ) {
    let userRole = body.Payload.role;
    if (userRole === 'admin' || 'user') {
      return this.qaService.PopularQa(sortBy);
    } else {
      return 'access denied!';
    }
  }

  @Get('sortby')
  qaSortBytopic(@Query('sortBy') sortBy: 'asc' | 'desc' = 'asc', @Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin') {
      return this.qaService.qaSortBytopic(sortBy);
        } else {
      return 'access denied!';
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin'||'user') {
      return this.qaService.findOne(+id);
    } else {
      return 'access denied!';
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateQaDto: Prisma.questionAnswerUpdateInput,
    @Body() body: any,
  ) {
    let userRole = body.Payload.role;
    if (userRole === 'admin') {
      return this.qaService.update(+id, updateQaDto);
    } else {
      return 'access denied!';
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() body: any) {
    let userRole = body.Payload.role;
    if (userRole === 'admin') {
      return this.qaService.remove(+id);
    } else {
      return 'access denied!';
    }
  }
}
