import {
  Action,
  Body,
  Controller,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Post,
  UseAfter,
  UseBefore,
  UseInterceptor,
} from 'routing-controllers';
import 'reflect-metadata';
import { Example }                     from '../../models/example';
import { loggingAfter, loggingBefore } from '../middleware/logging-middleware';

@JsonController()
export class ExampleController {

  @UseBefore(loggingBefore)
  @UseAfter(loggingAfter)
  @UseInterceptor(function (action: Action, content: any) {
    console.log('change response...');
    return content;
  })
  @Get('/users/:id')
  getOne (@Param('id') id: number) {
    return 'This action returns user #' + id;
  }

  @Post('/users/:id')
  @OnUndefined(204)
  postOne (@Param('id') id: number, @Body() info: Example) {
    console.log(JSON.stringify(info));
    return JSON.stringify(info);
  }
}
