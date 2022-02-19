import { Service } from 'typedi';
import {
  Example,
  IExample,
}                  from '../models/example';

@Service()
export class ExampleRepository {

  #fakeData: Example[] = [
    new Example(1, { name: 'one', description: 'one description' }),
    new Example(2, { name: 'two', description: 'two description' }),
  ];

  findAll(): Example[] {
    return this.#fakeData;
  }

  findById(id: number): Example | undefined {
    return this.#fakeData.find((e: Example) => e.id === id);
  }

  create(data: IExample): Example {
    const last = this.#fakeData[this.#fakeData.length - 1];
    const id = last ? last.id + 1 : 1;
    const example = new Example(id, data);
    this.#fakeData.push(example);
    return example;
  }

  update(id: number, data: Partial<IExample>): Example | undefined {
    let example = this.findById(id);
    if (!example) {
      return undefined;
    }
    example = Object.assign(example, data);
    return example;
  }

  delete(id: number): Example | undefined {
    const index = this.#fakeData.findIndex((e: Example) => e.id === id);
    if (index === -1) {
      return undefined;
    }
    const example = this.findById(id);
    this.#fakeData.splice(index, 1);
    return example;
  }

}
