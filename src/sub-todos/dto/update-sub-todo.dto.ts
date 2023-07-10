import { PartialType } from '@nestjs/swagger';
import { CreateSubTodoDTO } from './create-sub-todo.dto';

export class UpdateSubTodoDTO extends PartialType(CreateSubTodoDTO) {}
