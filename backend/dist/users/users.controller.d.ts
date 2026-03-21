import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<({
        tasks: {
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
        }[];
        createdTasks: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        avatar: string | null;
    })[]>;
    findOne(id: string): Promise<{
        tasks: {
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
        }[];
        createdTasks: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        avatar: string | null;
    }>;
    findByEmail(email: string): Promise<{
        tasks: {
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
        }[];
        createdTasks: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        avatar: string | null;
    }>;
    create(dto: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        avatar: string | null;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        avatar: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        avatar: string | null;
    }>;
}
