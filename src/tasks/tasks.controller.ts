import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import Task from './entities/task.entity';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.tasksService.getAllTasks();
    return tasks;
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.getTaskById(Number(id));
    return task;
  }

  @Post()
  async createTask(@Body('title') title: string): Promise<Task> {
    const newTask = await this.tasksService.createTask(title);
    return newTask;
  }
  
  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<Task>{
    const task = await this.tasksService.deleteTask(id);
    return task;
  }
}
