"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("../app.module");
const prisma_service_1 = require("../prisma/prisma.service");
describe('Auth Integration Tests', () => {
    let app;
    let prisma;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
        }));
        await app.init();
        prisma = app.get(prisma_service_1.PrismaService);
        await prisma.user.deleteMany({
            where: {
                email: {
                    contains: 'integration-test',
                },
            },
        });
    });
    afterAll(async () => {
        await prisma.user.deleteMany({
            where: {
                email: {
                    contains: 'integration-test',
                },
            },
        });
        await app.close();
    });
    describe('Complete Auth Flow', () => {
        let userToken;
        const testUser = {
            name: 'Integration Test User',
            email: 'integration-test@example.com',
            password: 'testpassword123',
        };
        it('should complete full registration and login flow', async () => {
            const registerResponse = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send(testUser)
                .expect(201);
            expect(registerResponse.body).toHaveProperty('user');
            expect(registerResponse.body).toHaveProperty('token');
            expect(registerResponse.body.user.email).toBe(testUser.email);
            expect(registerResponse.body.user.name).toBe(testUser.name);
            expect(registerResponse.body.user.password).toBeUndefined();
            const registrationToken = registerResponse.body.token;
            const profileResponse1 = await (0, supertest_1.default)(app.getHttpServer())
                .get('/auth/profile')
                .set('Authorization', `Bearer ${registrationToken}`)
                .expect(200);
            expect(profileResponse1.body.email).toBe(testUser.email);
            expect(profileResponse1.body.name).toBe(testUser.name);
            const loginResponse = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: testUser.email,
                password: testUser.password,
            })
                .expect(201);
            expect(loginResponse.body).toHaveProperty('token');
            expect(loginResponse.body).toHaveProperty('user');
            userToken = loginResponse.body.token;
            const profileResponse2 = await (0, supertest_1.default)(app.getHttpServer())
                .get('/auth/profile')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);
            expect(profileResponse2.body.email).toBe(testUser.email);
            expect(profileResponse2.body.name).toBe(testUser.name);
        });
        it('should prevent duplicate registration', async () => {
            const testUserDuplicate = {
                name: 'Duplicate User',
                email: 'integration-test@example.com',
                password: 'anotherpassword123',
            };
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send(testUserDuplicate)
                .expect(409);
            expect(response.body.message).toContain('already exists');
            expect(response.body.statusCode).toBe(409);
        });
        it('should reject login with wrong password', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: 'integration-test@example.com',
                password: 'wrongpassword',
            })
                .expect(401);
            expect(response.body.message).toContain('Invalid credentials');
            expect(response.body.statusCode).toBe(401);
        });
        it('should reject profile access without token', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get('/auth/profile')
                .expect(401);
            expect(response.body.message).toContain('Unauthorized');
        });
        it('should reject profile access with invalid token', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get('/auth/profile')
                .set('Authorization', 'Bearer invalid-token-here')
                .expect(401);
            expect(response.body.message).toContain('Unauthorized');
        });
    });
    describe('Validation Tests', () => {
        it('should reject registration with invalid email', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: 'Test User',
                email: 'not-an-email',
                password: 'password123',
            })
                .expect(400);
            expect(Array.isArray(response.body.message)).toBeTruthy();
            expect(response.body.message.some(msg => msg.toLowerCase().includes('email'))).toBeTruthy();
        });
        it('should reject registration with short password', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: 'Test User',
                email: 'test-validation@example.com',
                password: '12345',
            })
                .expect(400);
            expect(Array.isArray(response.body.message)).toBeTruthy();
            expect(response.body.message.some(msg => msg.toLowerCase().includes('password') &&
                (msg.includes('6') || msg.includes('at least')))).toBeTruthy();
        });
        it('should reject registration without name', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: 'test-validation@example.com',
                password: 'password123',
            })
                .expect(400);
            expect(Array.isArray(response.body.message)).toBeTruthy();
            expect(response.body.message.some(msg => msg.toLowerCase().includes('name'))).toBeTruthy();
        });
        it('should reject registration without email', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: 'Test User',
                password: 'password123',
            })
                .expect(400);
            expect(Array.isArray(response.body.message)).toBeTruthy();
            expect(response.body.message.some(msg => msg.toLowerCase().includes('email'))).toBeTruthy();
        });
        it('should reject registration without password', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: 'Test User',
                email: 'test-validation@example.com',
            })
                .expect(400);
            expect(Array.isArray(response.body.message)).toBeTruthy();
            expect(response.body.message.some(msg => msg.toLowerCase().includes('password'))).toBeTruthy();
        });
        it('should reject login without email', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/login')
                .send({
                password: 'password123',
            })
                .expect(400);
            expect(Array.isArray(response.body.message)).toBeTruthy();
            expect(response.body.message.some(msg => msg.toLowerCase().includes('email'))).toBeTruthy();
        });
        it('should reject login without password', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: 'test@example.com',
            })
                .expect(400);
            expect(Array.isArray(response.body.message)).toBeTruthy();
            expect(response.body.message.some(msg => msg.toLowerCase().includes('password'))).toBeTruthy();
        });
        it('should reject registration with empty name', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: '',
                email: 'test-validation@example.com',
                password: 'password123',
            })
                .expect(400);
            expect(Array.isArray(response.body.message)).toBeTruthy();
            expect(response.body.message.some(msg => msg.toLowerCase().includes('name'))).toBeTruthy();
        });
    });
    describe('Edge Cases', () => {
        it('should handle login with non-existent email', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: 'nonexistent@example.com',
                password: 'password123',
            })
                .expect(401);
            expect(response.body.message).toContain('Invalid credentials');
        });
        it('should handle registration with very long inputs', async () => {
            const longName = 'a'.repeat(1000);
            const uniqueEmail = `long-input-${Date.now()}@example.com`;
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: longName,
                email: uniqueEmail,
                password: 'password123',
            })
                .expect(201);
            expect(response.body.user).toHaveProperty('id');
            expect(response.body.user.name).toBe(longName);
            expect(response.body.user.email).toBe(uniqueEmail);
            await prisma.user.deleteMany({
                where: {
                    email: uniqueEmail,
                },
            });
        });
        it('should handle registration with special characters in name', async () => {
            const uniqueEmail = `special-name-${Date.now()}@example.com`;
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: 'John Doe Jr. @#$%',
                email: uniqueEmail,
                password: 'password123',
            })
                .expect(201);
            expect(response.body.user).toHaveProperty('id');
            expect(response.body.user.name).toBe('John Doe Jr. @#$%');
            expect(response.body.user.email).toBe(uniqueEmail);
            await prisma.user.deleteMany({
                where: {
                    email: uniqueEmail,
                },
            });
        });
        it('should handle registration with email that has plus sign', async () => {
            const uniqueEmail = `test-plus-${Date.now()}+plus@example.com`;
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: 'Test User',
                email: uniqueEmail,
                password: 'password123',
            })
                .expect(201);
            expect(response.body.user).toHaveProperty('id');
            expect(response.body.user.email).toBe(uniqueEmail);
            await prisma.user.deleteMany({
                where: {
                    email: uniqueEmail,
                },
            });
        });
        it('should handle registration with maximum allowed name length', async () => {
            const maxLengthName = 'a'.repeat(255);
            const uniqueEmail = `max-length-${Date.now()}@example.com`;
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: maxLengthName,
                email: uniqueEmail,
                password: 'password123',
            })
                .expect(201);
            expect(response.body.user.name).toBe(maxLengthName);
            await prisma.user.deleteMany({
                where: {
                    email: uniqueEmail,
                },
            });
        });
        it('should handle registration with unicode characters in name', async () => {
            const uniqueEmail = `unicode-${Date.now()}@example.com`;
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: 'José María 🚀 测试',
                email: uniqueEmail,
                password: 'password123',
            })
                .expect(201);
            expect(response.body.user).toHaveProperty('id');
            expect(response.body.user.name).toBe('José María 🚀 测试');
            await prisma.user.deleteMany({
                where: {
                    email: uniqueEmail,
                },
            });
        });
        it('should handle registration with email containing dots', async () => {
            const uniqueEmail = `test.dots.${Date.now()}@example.com`;
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: 'Test User',
                email: uniqueEmail,
                password: 'password123',
            })
                .expect(201);
            expect(response.body.user.email).toBe(uniqueEmail);
            await prisma.user.deleteMany({
                where: {
                    email: uniqueEmail,
                },
            });
        });
    });
});
//# sourceMappingURL=auth.intergrate.spec.js.map