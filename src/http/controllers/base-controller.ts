import {
  Action, Controller, Get,
  OnUndefined, Param,
  Post,
  UseAfter, UseBefore, UseInterceptor } from 'routing-controllers';
import 'reflect-metadata';
import { Info }                         from '../../models';
import { loggingAfter, loggingBefore }  from '../middleware';

@Controller()
export class BaseController {

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
  postOne ({ id, info }: { id: number, info: Info }) {
    console.log(JSON.stringify(info));
  }
}
