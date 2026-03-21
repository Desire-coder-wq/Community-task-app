import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, TaskStatus } from './dto/task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(status?: TaskStatus): Promise<({
        community: {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        assignee: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
        };
        creator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
        };
    } & {
        title: string;
        description: string | null;
        priority: import(".prisma/client").$Enums.Priority;
        dueDate: Date | null;
        assigneeId: string | null;
        communityId: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
    })[]>;
    findOne(id: string): Promise<{
        community: {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        assignee: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
        };
        creator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
        };
    } & {
        title: string;
        description: string | null;
        priority: import(".prisma/client").$Enums.Priority;
        dueDate: Date | null;
        assigneeId: string | null;
        communityId: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
    }>;
    create(dto: CreateTaskDto & {
        creatorId: string;
    }): Promise<{
        community: {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        assignee: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
        };
        creator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
        };
    } & {
        title: string;
        description: string | null;
        priority: import(".prisma/client").$Enums.Priority;
        dueDate: Date | null;
        assigneeId: string | null;
        communityId: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
    }>;
    update(id: string, dto: UpdateTaskDto): Promise<{
        community: {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        assignee: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
        };
        creator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
        };
    } & {
        title: string;
        description: string | null;
        priority: import(".prisma/client").$Enums.Priority;
        dueDate: Date | null;
        assigneeId: string | null;
        communityId: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
    }>;
    remove(id: string): Promise<{
        title: string;
        description: string | null;
        priority: import(".prisma/client").$Enums.Priority;
        dueDate: Date | null;
        assigneeId: string | null;
        communityId: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
    }>;
    getByCreator(creatorId: string): Promise<({
        community: {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        assignee: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
        };
        creator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
        };
    } & {
        title: string;
        description: string | null;
        priority: import(".prisma/client").$Enums.Priority;
        dueDate: Date | null;
        assigneeId: string | null;
        communityId: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
    })[]>;
    getByAssignee(assigneeId: string): Promise<({
        community: {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        assignee: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
        };
        creator: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            avatar: string | null;
        };
    } & {
        title: string;
        description: string | null;
        priority: import(".prisma/client").$Enums.Priority;
        dueDate: Date | null;
        assigneeId: string | null;
        communityId: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        creatorId: string;
    })[]>;
}
