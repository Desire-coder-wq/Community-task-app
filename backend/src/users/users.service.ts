import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        tasks: true,
        createdTasks: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        tasks: true,
        createdTasks: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        tasks: true,
        createdTasks: true,
      },
    });
  }

  async create(dto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException(`User with email ${dto.email} already exists`);
    }

    return this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        avatar: dto.avatar,
      },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id); // Verify user exists

    return this.prisma.user.update({
      where: { id },
      data: {
        name: dto.name,
        avatar: dto.avatar,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verify user exists

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
