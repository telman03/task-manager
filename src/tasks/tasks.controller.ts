import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from '@prisma/client';
import { UpdateTaskDto } from './dto/updatetask.dto';
import { ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AtGuard } from 'src/common/guards';


@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get all tasks' })
  @UseGuards(AtGuard)
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get task by id' })
  @ApiParam({ name: 'id', type: 'number' })
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @ApiResponse({ status: 200, description: 'Create task' })
  @ApiBody({ type: CreateTaskDto })
  async createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(dto);
  }
  
  @Put(':id')  
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @ApiResponse({ status: 200, description: 'Update task by id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateTaskDto })
  async updateTask(@Param('id') id: number, @Body() updateDto: UpdateTaskDto): Promise<Task>{
    return await this.tasksService.updateTask(id, updateDto);
  }

  @UseGuards(AtGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Delete task by id' })
  @ApiParam({ name: 'id', type: 'number' })
  async deleteTask(@Param('id') id: number): Promise<Task>{
    return await this.tasksService.deleteTask(id);
    
  }
}
