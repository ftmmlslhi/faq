import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TopicRepository } from './topic.repository';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [TopicController],
  providers: [TopicService,TopicRepository],
  imports: [PrismaModule],
})
export class TopicModule {}
