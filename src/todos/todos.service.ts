import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { TodoEntity } from './entity/todos.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly prisma: PrismaService
  ) { }

  async getTodos(): Promise<TodoEntity[]> {
    return this.prisma.todos.findMany();
  }

  async getTodoById(id: number): Promise<TodoEntity> {
    return this.prisma.todos.findUnique({
      where: { id, },
    });
  }

  async getTodoByUserId(userId: number): Promise<TodoEntity[]> {
    return this.prisma.todos.findMany({
      where: { userId, },
    });
  }

  async createTodo(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
    return this.prisma.todos.create({
      data: createTodoDto,
    });
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDTO): Promise<TodoEntity> {
    return this.prisma.todos.update({
      where: { id, },
      data: updateTodoDto,
    });
  }

  async deleteTodo(id: number) {
    return this.prisma.todos.delete({
      where: { id, },
    });
  }
}