import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from '@prisma/client';
import { UpdateTaskDto } from './dto/updatetask.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';


@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.getTaskById(Number(id));
  }

  @Post()
  async createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(dto);
  }
  
  @Put(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateTaskDto })
  async updateTask(@Param('id') id: number, @Body() updateDto: UpdateTaskDto): Promise<Task>{
    return await this.tasksService.updateTask(id, updateDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async deleteTask(@Param('id') id: number): Promise<Task>{
    const task = await this.tasksService.deleteTask(id);
    return task;
  }
}
