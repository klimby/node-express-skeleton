import { IsDefined } from 'class-validator';

export interface IExample {
  name: string;
  description?: string;
}

export class Example implements IExample {
  id = 0;
  name = '';
  description?: string;

  constructor(id: number, data: IExample) {
    this.id = id;
    this.name = data.name;
    this.description = data.description;
  }
}

export class ExampleData implements IExample {

  @IsDefined()
  name!: string;

  description?: string;
}


