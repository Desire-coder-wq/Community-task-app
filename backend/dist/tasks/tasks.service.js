"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const task_dto_1 = require("./dto/task.dto");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(status) {
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
    async findOne(id) {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: {
                assignee: true,
                creator: true,
                community: true,
            },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    async create(creatorId, dto) {
        return this.prisma.task.create({
            data: {
                title: dto.title,
                description: dto.description,
                priority: dto.priority || task_dto_1.Priority.MEDIUM,
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
    async update(id, dto) {
        await this.findOne(id);
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
    async remove(id) {
        await this.findOne(id);
        return this.prisma.task.delete({
            where: { id },
        });
    }
    async getTasksByCreator(creatorId) {
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
    async getTasksByAssignee(assigneeId) {
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
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map