import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '@prisma/client';
import { TodoEntity } from '@/todos/entity/todos.entity';
import { UserEntity } from '@/user/entity/user.entity';

export class SubTodoEntity {
  @ApiProperty({ type: Number, description: '식별자', })
  id?: number;

  @ApiProperty({ type: Number, description: '유저 식별자', })
  userId?: number;

  @ApiProperty({ type: Number, description: '할 일 식별자', })
  todoId?: number;

  @ApiProperty({ type: 'enum', enum: TodoStatus, description: '상태', })
  status?: TodoStatus;

  @ApiProperty({ type: Date, description: '생성일자', })
  created?: Date;

  @ApiProperty({ type: String, description: '내용', })
  content?: string;

  @ApiProperty({ type: () => UserEntity, description: '유저 정보', })
  User?: UserEntity;

  @ApiProperty({ type: () => TodoEntity, description: '할 일 목록', })
  Todos?: TodoEntity;
}
