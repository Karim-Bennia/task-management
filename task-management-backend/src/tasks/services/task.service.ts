import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const newTask = new this.taskModel(createTaskDto);
      return await newTask.save();
    } catch (error) {
      throw new BadRequestException(`Error creating task: ${error.message}`);
    }
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      return await this.taskModel.find().exec();
    } catch (error) {
      throw new BadRequestException(`Error fetching tasks: ${error.message}`);
    }
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById(id).exec();
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return task;
    } catch (error) {
      throw new BadRequestException(`Error fetching task: ${error.message}`);
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const updatedTask = await this.taskModel
        .findByIdAndUpdate(id, updateTaskDto, {
          new: true,
        })
        .exec();
      if (!updatedTask) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return updatedTask;
    } catch (error) {
      throw new BadRequestException(`Error updating task: ${error.message}`);
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const result = await this.taskModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
    } catch (error) {
      throw new BadRequestException(`Error deleting task: ${error.message}`);
    }
  }

  async getTaskSummary(): Promise<any> {
    try {
      const totalTasks = await this.taskModel.countDocuments().exec();
      const completedTasks = await this.taskModel
        .countDocuments({ status: 'Completed' })
        .exec();
      const pendingTasks = await this.taskModel
        .countDocuments({ status: 'Pending' })
        .exec();

      const inprogressTasks = await this.taskModel
        .countDocuments({ status: 'In Progress' })
        .exec();
      return {
        totalTasks,
        completedTasks,
        pendingTasks,
        inprogressTasks,
      };
    } catch (error) {
      throw new BadRequestException(
        `Error fetching task summary: ${error.message}`,
      );
    }
  }
  async getOverdueTasks(): Promise<any> {
    const overdueTasks = await this.taskModel
      .find({ dueDate: { $lt: new Date() }, status: { $ne: 'completed' } })
      .exec();
    return overdueTasks;
  }
}
