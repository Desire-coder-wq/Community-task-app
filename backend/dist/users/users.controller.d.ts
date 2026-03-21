import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<({
        tasks: {
            title: string;
            description: string;
            priority: import(".prisma/client").$Enums.Priority;
            dueDate: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        createdTasks: {
            title: string;
            description: string;
            priority: import(".prisma/client").$Enums.Priority;
            dueDate: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        avatar: string | null;
    })[]>;
    findOne(id: string): Promise<{
        tasks: {
            title: string;
            description: string;
            priority: import(".prisma/client").$Enums.Priority;
            dueDate: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        createdTasks: {
            title: string;
            description: string;
            priority: import(".prisma/client").$Enums.Priority;
            dueDate: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        avatar: string | null;
    }>;
    findByEmail(email: string): Promise<{
        tasks: {
            title: string;
            description: string;
            priority: import(".prisma/client").$Enums.Priority;
            dueDate: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        createdTasks: {
            title: string;
            description: string;
            priority: import(".prisma/client").$Enums.Priority;
            dueDate: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        avatar: string | null;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        avatar: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        avatar: string;
    }>;
}
