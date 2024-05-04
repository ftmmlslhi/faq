import { Module } from '@nestjs/common';
import { QaService } from './qa.service';
import { QaController } from './qa.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { QaRepository } from './qa.repository';

@Module({
  controllers: [QaController],
  providers: [QaService,QaRepository],
  imports: [PrismaModule]
})
export class QaModule {}
