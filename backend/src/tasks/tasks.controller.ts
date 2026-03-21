import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, TaskStatus } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Query('status') status?: TaskStatus) {
    return this.tasksService.findAll(status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateTaskDto & { creatorId: string }) {
    const { creatorId, ...taskDto } = dto;
    return this.tasksService.create(creatorId, taskDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @Get('creator/:creatorId')
  async getByCreator(@Param('creatorId') creatorId: string) {
    return this.tasksService.getTasksByCreator(creatorId);
  }

  @Get('assignee/:assigneeId')
  async getByAssignee(@Param('assigneeId') assigneeId: string) {
    return this.tasksService.getTasksByAssignee(assigneeId);
  }
}
