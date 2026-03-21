"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const jwt_strategy_1 = require("./jwt.strategy");
const prisma_service_1 = require("../prisma/prisma.service");
describe('JwtStrategy', () => {
    let strategy;
    let prismaService;
    const mockPrismaService = {
        user: {
            findUnique: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                jwt_strategy_1.JwtStrategy,
                {
                    provide: prisma_service_1.PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();
        strategy = module.get(jwt_strategy_1.JwtStrategy);
        prismaService = module.get(prisma_service_1.PrismaService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('validate', () => {
        it('should return user when valid payload is provided', async () => {
            const payload = {
                sub: 'user-id-123',
                email: 'john@example.com',
            };
            const user = {
                id: 'user-id-123',
                email: 'john@example.com',
                name: 'John Doe',
                avatar: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockPrismaService.user.findUnique.mockResolvedValue(user);
            const result = await strategy.validate(payload);
            expect(prismaService.user.findUnique).toHaveBeenCalledWith({
                where: { id: 'user-id-123' },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    avatar: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            expect(result).toEqual(user);
        });
        it('should throw UnauthorizedException when user not found', async () => {
            const payload = {
                sub: 'invalid-user-id',
                email: 'invalid@example.com',
            };
            mockPrismaService.user.findUnique.mockResolvedValue(null);
            await expect(strategy.validate(payload)).rejects.toThrow(common_1.UnauthorizedException);
            await expect(strategy.validate(payload)).rejects.toThrow('User not found');
        });
    });
});
//# sourceMappingURL=jwt.strategy.spec.js.map