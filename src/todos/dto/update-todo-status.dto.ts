import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class UpdateTodoStatusDTO {
  @IsNotEmpty({ message: '변경할 상태를 입력해야합니다.', })
  @ApiProperty({ description: '할 일의 상태', example: 'ADDED', })
  status: TodoStatus;
}
