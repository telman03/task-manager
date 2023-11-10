import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
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

  async getTaskById(id: any) {
    const taskId = parseInt(id, 10);
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
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

  async updateTask(id: any, updateTaskDto: UpdateTaskDto){
    const taskId = parseInt(id, 10);

    const existingTask = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (isNaN(taskId)) {
      throw new BadRequestException('Invalid task ID');
    }
    
    if(!existingTask){   
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.prisma.task.update({
      where: { id: taskId },
      data: updateTaskDto,
    });
  
  }
  async deleteTask(id: any) {
    const taskId = parseInt(id, 10);
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  
    return await this.prisma.task.delete({ 
      where: { id: taskId },
    });
  }
}

