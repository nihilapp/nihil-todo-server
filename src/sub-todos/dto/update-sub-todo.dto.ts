import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateSubTodoDTO {
  @IsNotEmpty({ message: '할 일을 입력해야합니다.', })
  @ApiProperty({ description: '할 일', example: '할 일', })
  content: string;
}
