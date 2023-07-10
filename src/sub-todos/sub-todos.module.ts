import { Module } from '@nestjs/common';
import { SubTodosService } from './sub-todos.service';
import { SubTodosController } from './sub-todos.controller';

@Module({
  providers: [SubTodosService],
  controllers: [SubTodosController]
})
export class SubTodosModule {}
