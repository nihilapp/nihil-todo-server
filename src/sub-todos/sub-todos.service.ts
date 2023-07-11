import { Injectable } from '@nestjs/common';
import { TodoStatus } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { SubTodoEntity } from './entity/sub-todos.entity';
import { CreateSubTodoDTO } from './dto/create-sub-todo.dto';
import { UpdateSubTodoDTO } from './dto/update-sub-todo.dto';
import { UpdateTodoStatusDTO } from '@/todos/dto/update-todo-status.dto';

@Injectable()
export class SubTodosService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly prisma: PrismaService
  ) { }

  async getSubTodos(): Promise<SubTodoEntity[]> {
    return this.prisma.subTodos.findMany();
  }

  async getSubTodoById(id: number): Promise<SubTodoEntity> {
    return this.prisma.subTodos.findUnique({
      where: { id, },
    });
  }

  async getSubTodoByUserId(userId: number): Promise<SubTodoEntity[]> {
    return this.prisma.subTodos.findMany({
      where: { userId, },
    });
  }

  async getSubTodoByStatus(status: TodoStatus): Promise<SubTodoEntity[]> {
    return this.prisma.subTodos.findMany({
      where: { status, },
    });
  }

  async createSubTodo(createSubTodoDto: CreateSubTodoDTO): Promise<SubTodoEntity> {
    return this.prisma.subTodos.create({
      data: createSubTodoDto,
    });
  }

  async updateSubTodoStatus(id: number, updateTodoStatusDto: UpdateTodoStatusDTO): Promise<SubTodoEntity> {
    return this.prisma.subTodos.update({
      where: { id, },
      data: updateTodoStatusDto,
    });
  }

  async updateSubTodo(id: number, updateSubTodoDto: UpdateSubTodoDTO): Promise<SubTodoEntity> {
    return this.prisma.subTodos.update({
      where: { id, },
      data: updateSubTodoDto,
    });
  }

  async deleteSubTodo(id: number) {
    return this.prisma.subTodos.delete({
      where: { id, },
    });
  }
}
