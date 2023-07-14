import {
  Body,
  Controller, Delete, Get, Param, Patch, Post
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { TodoStatus, UserRole } from '@prisma/client';
import { SubTodosService } from './sub-todos.service';
import { SubTodoEntity } from './entity/sub-todos.entity';
import { Auth } from '@/auth/decorator';
import { HttpErrorDTO } from '@/common/dto';
import { CreateSubTodoDTO } from './dto/create-sub-todo.dto';
import { UpdateSubTodoDTO } from './dto/update-sub-todo.dto';
import { UpdateTodoStatusDTO } from '@/todos/dto/update-todo-status.dto';

@Controller('sub-todos')
@ApiTags('SubTodos')
export class SubTodosController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly subTodosService: SubTodosService
  ) { }

  @Get('')
  @ApiOkResponse({ description: '성공', type: () => SubTodoEntity, isArray: true, })
  @ApiOperation({
    summary: '모든 할 일 조회',
    description: '모든 할 일을 조회합니다.',
  })
  async getSubTodos(): Promise<SubTodoEntity[]> {
    return this.subTodosService.getSubTodos();
  }

  @Get('/:id')
  @ApiOkResponse({ description: '성공', type: () => SubTodoEntity, })
  @ApiOperation({
    summary: '개별 할 일 조회',
    description: '개별 할 일을 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'id를 입력합니다.',
  })
  async getSubTodoById(@Param('id') id: number): Promise<SubTodoEntity> {
    return this.subTodosService.getSubTodoById(id);
  }

  @Get('/user/:userId')
  @ApiOkResponse({ description: '성공', type: () => SubTodoEntity, isArray: true, })
  @ApiOperation({
    summary: '특정 유저의 할 일 조회',
    description: '특정 유저의 할 일을 조회합니다.',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: '유저의 id를 입력합니다.',
  })
  async getSubTodoByUserId(@Param('userId') userId: number): Promise<SubTodoEntity[]> {
    return this.subTodosService.getSubTodoByUserId(userId);
  }

  @Get('/status/:status')
  @ApiOkResponse({ description: '성공', type: () => SubTodoEntity, isArray: true, })
  @ApiOperation({
    summary: '특정 상태의 할 일 조회',
    description: '특정 상태의 할 일을 조회합니다.',
  })
  @ApiParam({
    name: 'status',
    type: String,
    description: '할 일의 상태를 입력합니다.',
  })
  async getSubTodoByStatus(@Param('status') status: TodoStatus) {
    return this.subTodosService.getSubTodoByStatus(status);
  }

  @Post('')
  @Auth([ UserRole.ADMIN, UserRole.USER, ])
  @ApiOkResponse({ description: '성공', type: () => SubTodoEntity, })
  @ApiUnauthorizedResponse({ description: '인증 실패', type: HttpErrorDTO, })
  @ApiOperation({
    summary: '할 일 추가',
    description: '할 일을 새로 추가합니다.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'id를 입력합니다.',
  })
  @ApiBody({
    type: CreateSubTodoDTO,
    description: '새로운 할 일 데이터를 전달합니다.',
  })
  async createSubTodo(@Body() createTodoDto: CreateSubTodoDTO): Promise<SubTodoEntity> {
    return this.subTodosService.createSubTodo(createTodoDto);
  }

  @Patch('/:id/status')
  @Auth([ UserRole.ADMIN, UserRole.USER, ])
  @ApiOkResponse({ description: '성공', type: () => SubTodoEntity, })
  @ApiUnauthorizedResponse({ description: '인증 실패', type: HttpErrorDTO, })
  @ApiOperation({
    summary: '할 일 상태 수정',
    description: '할 일 상태를 수정합니다.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'id를 입력합니다.',
  })
  @ApiBody({
    type: UpdateTodoStatusDTO,
    description: '새로운 할 일 상태 데이터를 전달합니다.',
  })
  async updateSubTodoStatus(
    @Param('id') id: number,
    @Body() updateTodoStatusDto: UpdateTodoStatusDTO
  ) {
    return this.subTodosService.updateSubTodoStatus(id, updateTodoStatusDto);
  }

  @Patch('/:id')
  @Auth([ UserRole.ADMIN, UserRole.USER, ])
  @ApiOkResponse({ description: '성공', type: () => SubTodoEntity, })
  @ApiUnauthorizedResponse({ description: '인증 실패', type: HttpErrorDTO, })
  @ApiOperation({
    summary: '할 일 수정',
    description: '할 일을 수정합니다.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'id를 입력합니다.',
  })
  @ApiBody({
    type: UpdateSubTodoDTO,
    description: '수정된 할 일 데이터를 전달합니다.',
  })
  async updateSubTodo(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateSubTodoDTO
  ) {
    return this.subTodosService.updateSubTodo(id, updateTodoDto);
  }

  @Delete(':/id')
  @Auth([ UserRole.ADMIN, UserRole.USER, ])
  @ApiUnauthorizedResponse({ description: '인증 실패', type: HttpErrorDTO, })
  @ApiOperation({
    summary: '할 일 삭제',
    description: '할 일을 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'id를 입력합니다.',
  })
  async deleteSubTodo(@Param('id') id: number) {
    return this.subTodosService.deleteSubTodo(id);
  }
}
