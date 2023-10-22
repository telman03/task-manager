import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Task from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ){}

  async getAllTasks() {
    const tasks = await this.taskRepository.find();
    return tasks;
  }

  async getTaskById(id: number) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id
      },
    });

    if(task){
      return task;
    }
    throw new NotFoundException(`Task with ID ${id} not found`);
  
  
  }

  async createTask(title: string) {
    const newTask = await this.taskRepository.create({title});
    await this.taskRepository.save(newTask);
    return newTask;
  }

  async updateTask(id:number, title:string){
    const task = await this.getTaskById(id);
    task.title = title;
    await this.taskRepository.save(task);
    return task;
  }
  async deleteTask(id: number) {
    const task = await this.getTaskById(id);
    await this.taskRepository.delete(task);
    return task;
  }
}

