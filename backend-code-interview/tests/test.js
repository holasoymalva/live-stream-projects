const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Task = require('../models/Task');

beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Task.deleteMany();
});

describe('Task API', () => {
    test('should create a new task', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({
                title: 'Task 1',
                description: 'Description 1',
                dueDate: new Date(),
                status: 'pending',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('Task 1');
    });

    test('should get all tasks', async () => {
        // Arrange
        await Task.create({
            title: 'Task 1',
            description: 'Description 1',
            dueDate: new Date(),
            status: 'pending',
        });

        await Task.create({
            title: 'Task 2',
            description: 'Description 2',
            dueDate: new Date(),
            status: 'pending',
        });

        // Act
        const response = await request(app).get('/api/tasks');
        
        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
    });
});