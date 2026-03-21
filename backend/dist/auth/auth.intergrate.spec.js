"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = __importStar(require("supertest"));
const app_module_1 = require("../src/app.module");
const prisma_service_1 = require("../src/prisma/prisma.service");
describe('Auth Integration Tests', () => {
    let app;
    let prisma;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe());
        await app.init();
        prisma = app.get(prisma_service_1.PrismaService);
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
            const registerResponse = await request(app.getHttpServer())
                .post('/auth/register')
                .send(testUser)
                .expect(201);
            expect(registerResponse.body).toHaveProperty('user');
            expect(registerResponse.body).toHaveProperty('token');
            expect(registerResponse.body.user.email).toBe(testUser.email);
            const registrationToken = registerResponse.body.token;
            const profileResponse1 = await request(app.getHttpServer())
                .get('/auth/profile')
                .set('Authorization', `Bearer ${registrationToken}`)
                .expect(200);
            expect(profileResponse1.body.email).toBe(testUser.email);
            const loginResponse = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: testUser.email,
                password: testUser.password,
            })
                .expect(201);
            expect(loginResponse.body).toHaveProperty('token');
            userToken = loginResponse.body.token;
            const profileResponse2 = await request(app.getHttpServer())
                .get('/auth/profile')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);
            expect(profileResponse2.body.email).toBe(testUser.email);
            expect(profileResponse2.body.name).toBe(testUser.name);
        });
        it('should prevent duplicate registration', async () => {
            await request(app.getHttpServer())
                .post('/auth/register')
                .send(testUser)
                .expect(409);
        });
        it('should reject login with wrong password', async () => {
            await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: testUser.email,
                password: 'wrongpassword',
            })
                .expect(401);
        });
        it('should reject profile access without token', async () => {
            await request(app.getHttpServer())
                .get('/auth/profile')
                .expect(401);
        });
        it('should reject profile access with invalid token', async () => {
            await request(app.getHttpServer())
                .get('/auth/profile')
                .set('Authorization', 'Bearer invalid-token-here')
                .expect(401);
        });
    });
    describe('Validation Tests', () => {
        it('should reject registration with invalid email', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: 'Test User',
                email: 'not-an-email',
                password: 'password123',
            })
                .expect(400);
            expect(response.body.message).toContain('email');
        });
        it('should reject registration with short password', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/register')
                .send({
                name: 'Test User',
                email: 'test@example.com',
                password: '12345',
            })
                .expect(400);
            expect(response.body.message).toContain('6 characters');
        });
        it('should reject registration without name', async () => {
            await request(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: 'test@example.com',
                password: 'password123',
            })
                .expect(400);
        });
        it('should reject login without email', async () => {
            await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                password: 'password123',
            })
                .expect(400);
        });
        it('should reject login without password', async () => {
            await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: 'test@example.com',
            })
                .expect(400);
        });
    });
});
//# sourceMappingURL=auth.intergrate.spec.js.map