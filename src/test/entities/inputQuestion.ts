
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Test } from "./test.entity";

@Entity()
export class inputQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @ManyToOne(() => Test, (question) => question.inputQuestions)
  @JoinColumn()
  test: Test
}
