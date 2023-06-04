import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrueFalseQuestion } from './entities/trueFalseQustion';
import { Test } from './entities/test.entity';
import { SelectQuestion } from './entities/selectQuestion';
import { inputQuestion } from './entities/inputQuestion';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      TrueFalseQuestion,
      Test,
      SelectQuestion,
      inputQuestion,
    ])
  ],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
