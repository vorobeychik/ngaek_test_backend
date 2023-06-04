import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TrueFalseQuestion } from "./trueFalseQustion";
import { inputQuestion } from "./inputQuestion";
import { SelectQuestion } from "./selectQuestion";

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TrueFalseQuestion, (question) => question.test)
  trueFalseQuestions: TrueFalseQuestion[];

  @OneToMany(() => inputQuestion, (question) => question.test)
  inputQuestions: inputQuestion[];
  
  @OneToMany(() => SelectQuestion, (question) => question.test)
  selectQuestions: SelectQuestion[];

}
