// TypeScript types matching Prisma schema

// TaskStatus enum (matching Prisma)
export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// Priority enum (matching Prisma)
export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

// User interface (matching Prisma User model)
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Task interface (matching Prisma Task model)
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  assigneeId?: string;
  assignee?: User;
  creatorId: string;
  creator?: User;
  communityId?: string;
  community?: Community;
}

// Community interface (matching Prisma Community model)
export interface Community {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  tasks?: Task[];
}

// Auth Response
export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}