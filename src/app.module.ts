import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SectionModule } from './section/section.module';
import { QaModule } from './qa/qa.module';
import { TopicModule } from './topic/topic.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SectionModule, TopicModule, QaModule, UserModule , JwtModule.register({
    global: true,
    secret: process.env.SECRET,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
