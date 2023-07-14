import {
  Body, Controller, Delete, Get, Param, Patch, Post
} from '@nestjs/common';
import { TodoStatus, UserRole } from '@prisma/client';
import {
  ApiBody,
  ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { TodoEntity } from './entity/todos.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Auth } from '@/auth/decorator';
import { HttpErrorDTO } from '@/common/dto';
import { UpdateTodoStatusDTO } from './dto/update-todo-status.dto';

@Controller('todos')
@ApiTags('Todos')
export class TodosController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly todosService: TodosService
  ) { }

  @Get('')
  @ApiOkResponse({ description: '성공', type: () => TodoEntity, isArray: true, })
  @ApiOperation({
    summary: '모든 할 일 조회',
    description: '모든 할 일을 조회합니다.',
  })
  async getTodos(): Promise<TodoEntity[]> {
    return this.todosService.getTodos();
  }

  @Get('/:id')
  @ApiOkResponse({ description: '성공', type: () => TodoEntity, })
  @ApiOperation({
    summary: '개별 할 일 조회',
    description: '개별 할 일을 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'id를 입력합니다.',
  })
  async getTodoById(@Param('id') id: number): Promise<TodoEntity> {
    return this.todosService.getTodoById(id);
  }

  @Get('/user/:userId')
  @ApiOkResponse({ description: '성공', type: () => TodoEntity, isArray: true, })
  @ApiOperation({
    summary: '특정 유저의 할 일 조회',
    description: '특정 유저의 할 일을 조회합니다.',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: '유저의 id를 입력합니다.',
  })
  async getTodoByUserId(@Param('userId') userId: number): Promise<TodoEntity[]> {
    return this.todosService.getTodoByUserId(userId);
  }

  @Get('/status/:status')
  @ApiOkResponse({ description: '성공', type: () => TodoEntity, isArray: true, })
  @ApiOperation({
    summary: '특정 상태의 할 일 조회',
    description: '특정 상태의 할 일을 조회합니다.',
  })
  @ApiParam({
    name: 'status',
    type: String,
    description: '할 일의 상태를 입력합니다.',
  })
  async getTodoByStatus(@Param('status') status: TodoStatus) {
    return this.todosService.getTodoByStatus(status);
  }

  @Post('')
  @Auth([ UserRole.ADMIN, UserRole.USER, ])
  @ApiOkResponse({ description: '성공', type: () => TodoEntity, })
  @ApiUnauthorizedResponse({ description: '인증 실패', type: HttpErrorDTO, })
  @ApiOperation({
    summary: '할 일 추가',
    description: '할 일을 새로 추가합니다.',
  })
  @ApiBody({
    type: CreateTodoDTO,
    description: '새로운 할 일 데이터를 전달합니다.',
  })
  async createTodo(@Body() createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
    return this.todosService.createTodo(createTodoDto);
  }

  @Patch('/:id/status')
  @Auth([ UserRole.ADMIN, UserRole.USER, ])
  @ApiOkResponse({ description: '성공', type: () => TodoEntity, })
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
    type: UpdateTodoDTO,
    description: '새로운 할 일 상태 데이터를 전달합니다.',
  })
  async updateTodoStatus(
    @Param('id') id: number,
    @Body() updateTodoStatusDto: UpdateTodoStatusDTO
  ) {
    return this.todosService.updateTodoStatus(id, updateTodoStatusDto);
  }

  @Patch('/:id')
  @Auth([ UserRole.ADMIN, UserRole.USER, ])
  @ApiOkResponse({ description: '성공', type: () => TodoEntity, })
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
    type: UpdateTodoDTO,
    description: '수정된 할 일 데이터를 전달합니다.',
  })
  async updateTodo(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDTO
  ) {
    return this.todosService.updateTodo(id, updateTodoDto);
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
  async deleteTodo(@Param('id') id: number) {
    return this.todosService.deleteTodo(id);
  }
}
