import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SelectQuestion } from './entities/selectQuestion';
import { inputQuestion } from './entities/inputQuestion';
import { TrueFalseQuestion } from './entities/trueFalseQustion';
import { Test } from './entities/test.entity';


@Injectable()
export class TestService {

  constructor(
    @InjectRepository(SelectQuestion)
    private readonly selectQuestionRepository: Repository<SelectQuestion>,
    @InjectRepository(inputQuestion)
    private readonly inputQuestionRepository: Repository<inputQuestion>,
    @InjectRepository(TrueFalseQuestion)
    private readonly trueFalseQuestionRepository: Repository<TrueFalseQuestion>,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
  ) {

  }
  async create(createTestDto: any) {
    console.log(createTestDto);
    const { trueFalseQuestions, inputQuestions, selectQuestions } = createTestDto;
    const savedInputQuestions = await this.createInputQuestions(inputQuestions);
    const savedTrueFalseQuestions = await this.createTrueFalseQuestions(trueFalseQuestions);
    const savedSelectQuestions = await this.createSelectQuestions(selectQuestions);

    const test = await this.testRepository.save({
      name: createTestDto.name,
      inputQuestions: savedInputQuestions,
      trueFalseQuestions: savedTrueFalseQuestions,
      selectQuestions: savedSelectQuestions,
    })
    console.log('sv', savedSelectQuestions);
    return test;
  }

  async createTrueFalseQuestions(trueFalseQustions: any[]) {
    const result = [];

    trueFalseQustions.forEach((question) => {
      const trueFalseQustion = this.trueFalseQuestionRepository.save(question);
      result.push(trueFalseQustion);
    })
    const savedQuestion = await Promise.all(result);
    return savedQuestion;
  }

  async createInputQuestions(inputQustions: any[]) {
    const result = [];

    inputQustions.forEach((question) => {
      console.log('qs', question)
      const trueFalseQustion = this.inputQuestionRepository.save(question);
      result.push(trueFalseQustion);
    })
    const savedQuestion = await Promise.all(result);
    return savedQuestion;
  }

  async createSelectQuestions(selectQuestions: any) {
    const result = [];

    for (const question of selectQuestions) {
      await this.createTrueFalseQuestions(question.questions).then((trueFalseQuestions) => {
        const savedSelectQuestion = this.selectQuestionRepository.save({
          ...question,
          questions: trueFalseQuestions,
        })
        console.log(savedSelectQuestion)
        result.push(savedSelectQuestion);
      });
    }
    console.log('ress', result)
    const savedQuestion = await Promise.all(result);
    console.log('reszzz', savedQuestion)
    return savedQuestion;
  }

  findAll() {
    return `This action returns all test`;
  }

  findOne(id: number) {
    return this.testRepository.find({
      where: { id },
      relations: {
        inputQuestions: true,
        selectQuestions: {
          questions: true,
        },
        trueFalseQuestions: true,
      }
    });
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
