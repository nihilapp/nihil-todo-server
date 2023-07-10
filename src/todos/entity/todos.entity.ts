import { ApiProperty } from '@nestjs/swagger';
import { SubTodos, TodoStatus } from '@prisma/client';
import { SubTodoEntity } from '@/sub-todos/entity/sub-todos.entity';
import { UserEntity } from '@/user/entity/user.entity';

export class TodoEntity {
  @ApiProperty({ type: Number, description: '식별자', })
  id?: number;

  @ApiProperty({ type: Number, description: '유저 식별자', })
  userId?: number;

  @ApiProperty({ type: 'enum', enum: TodoStatus, description: '상태', })
  status?: TodoStatus;

  @ApiProperty({ type: Date, description: '생성일자', })
  created?: Date;

  @ApiProperty({ type: () => [ SubTodoEntity, ], description: '하위 목록', })
  SubTodos?: [SubTodos];

  @ApiProperty({ type: String, description: '내용', })
  content?: string;

  @ApiProperty({ type: () => UserEntity, description: '유저 정보', })
  User?: UserEntity;
}
