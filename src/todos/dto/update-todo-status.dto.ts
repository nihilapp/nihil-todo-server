import { TodoStatus } from '@prisma/client';

export class UpdateTodoStatusDTO {
  status: TodoStatus;
}
