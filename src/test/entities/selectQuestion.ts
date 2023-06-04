import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TrueFalseQuestion } from "./trueFalseQustion";
import { Test } from "./test.entity";

@Entity()
export class SelectQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @OneToMany(() => TrueFalseQuestion, (question) => question.selectQuestion)
  questions: TrueFalseQuestion[];

  @ManyToOne(() => Test, (question) => question.selectQuestions)
  @JoinColumn()
  test: Test
}
