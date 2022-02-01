import { IsDefined } from "class-validator";

export class Example {
  @IsDefined()
  name!: string;
  @IsDefined()
  description!: string;
}
