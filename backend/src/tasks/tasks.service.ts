import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskStatus, Priority } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: TaskStatus) {
    const where = status ? { status } : {};
    return this.prisma.task.findMany({
      where,
      include: {
        assignee: true,
        creator: true,
        community: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        assignee: true,
        creator: true,
        community: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async create(creatorId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        priority: dto.priority || Priority.MEDIUM,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        assigneeId: dto.assigneeId,
        communityId: dto.communityId,
        creatorId,
      },
      include: {
        assignee: true,
        creator: true,
        community: true,
      },
    });
  }

  async update(id: string, dto: UpdateTaskDto) {
    await this.findOne(id); // Verify task exists

    return this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        priority: dto.priority,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        assigneeId: dto.assigneeId,
      },
      include: {
        assignee: true,
        creator: true,
        community: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verify task exists

    return this.prisma.task.delete({
      where: { id },
    });
  }

  async getTasksByCreator(creatorId: string) {
    return this.prisma.task.findMany({
      where: { creatorId },
      include: {
        assignee: true,
        creator: true,
        community: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTasksByAssignee(assigneeId: string) {
    return this.prisma.task.findMany({
      where: { assigneeId },
      include: {
        assignee: true,
        creator: true,
        community: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
