import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/updatetask.dto';


@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks() {
    const tasks = await this.prisma.task.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    return tasks;

  }

  async getTaskById(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if(task){
      return task;
    }
    throw new NotFoundException(`Task with ID ${id} not found`);
  
  
  }

  async createTask(dto: CreateTaskDto) {
    const newTask = await this.prisma.task.create({
      data: {
        title: dto.title,
      },
    });
    return newTask;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto){
    const existingTask = await this.prisma.task.findUnique({
      where: {
        id
      },
    });
    
    if(!existingTask){   
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  
  }
  async deleteTask(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  
    return this.prisma.task.delete({ where: { id } });
  }
}

