import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SectionModule } from './section/section.module';
import { QaModule } from './qa/qa.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [SectionModule, TopicModule, QaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
