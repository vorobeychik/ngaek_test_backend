import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SelectQuestion } from "./selectQuestion";
import { Test } from "./test.entity";


@Entity()
export class TrueFalseQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  isTrue: boolean;

  @ManyToOne(() => SelectQuestion, (question) => question.questions)
  @JoinColumn()
  selectQuestion: SelectQuestion

  @ManyToOne(() => Test, (question) => question.trueFalseQuestions)
  @JoinColumn()
  test: Test
}
