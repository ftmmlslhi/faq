import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SectionRepository } from './section.repository';

@Module({
  controllers: [SectionController],
  providers: [SectionService, SectionRepository],
  imports: [PrismaModule],
})
export class SectionModule {}
