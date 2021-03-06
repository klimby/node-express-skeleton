import express               from 'express';
import 'reflect-metadata';
import {
  Action,
  Body,
  Delete,
  Get,
  JsonController,
  NotFoundError,
  OnUndefined,
  Param,
  Post,
  Put,
}                            from 'routing-controllers';
import { Service }           from 'typedi';
import {
  Example,
  ExampleData,
}                            from '../../models/example';
import { ExampleRepository } from '../../repositories/example-repository';
import {
  JsonArrayResponse,
  JsonModelResponse,
}                            from '../../types/common-types';

@Service()
@JsonController()
export class ExampleController {

  constructor(
      private exampleRepository: ExampleRepository,
  ) {}

  /**
   * Get all entities
   */
  @Get('/examples')
  getAll(): JsonArrayResponse<Example> {
    const data = this.exampleRepository.findAll();
    return { data, meta: {} };
  }

  /**
   * Get entity by id
   * @param id entity id
   */
  //@UseBefore(loggingBefore)
  //@UseAfter(loggingAfter)
  //@UseInterceptor(exampleInterceptor)
  @Get('/examples/:id')
  getOne(@Param('id') id: number): JsonModelResponse<Example> {
    let data = this.exampleRepository.findById(id);
    data = this.#handleNotFount(data);
    return { data, meta: {} };
  }

  /**
   * Create new entity
   * @param example entity data
   */
  @Post('/examples')
  create(@Body() example: ExampleData): JsonModelResponse<Example> {
    const data = this.exampleRepository.create(example);
    return { data, meta: {} };
  }

  /**
   * Update entity
   * @param id entity id
   * @param example entity data
   */
  @Put('/examples/:id')
  update(@Param('id') id: number, @Body() example: ExampleData): JsonModelResponse<Example> {
    let data = this.exampleRepository.update(id, example);
    data = this.#handleNotFount(data);
    return { data, meta: {} };
  }

  /**
   * Delete entity
   * @param id entity id
   */
  @Delete('/examples/:id')
  @OnUndefined(204)
  delete(@Param('id') id: number): undefined {
    const data = this.exampleRepository.delete(id);
    this.#handleNotFount(data);
    return undefined;
  }

  /**
   * Handle not found
   * @param data
   */
  #handleNotFount<T>(data: T | undefined): T {
    if (data === undefined) {
      throw new NotFoundError('Model not found');
    }
    return data;
  }
}

/**
 * Example Interceptor fn
 * @param action
 * @param content
 */
export function exampleInterceptor<T>(action: Action, content: T): T {
  // console.log('change response...');
    return content;
}

/**
 * Example before middleware
 * @param request
 * @param response
 * @param next
 */
export function loggingBefore(request: express.Request, response: express.Response, next: (err?: Error) => void): void {
  //console.log('do something Before...');
  next();
}

/**
 * Example after middleware
 * @param request
 * @param response
 * @param next
 */
export function loggingAfter(request: express.Request, response: express.Response, next: (err?: Error) => void): void {
  //console.log('do something After...');
  next();
}
