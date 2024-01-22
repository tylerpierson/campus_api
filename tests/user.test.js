const mongoose = require('mongoose');
const app = require('../app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const server = app.listen('8080', () => console.log('Let\'s Test'));
const User = require('../models/user');
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.connection.close();
    mongoServer.stop();
    server.close();
});

describe('Testing User Endpoints for RESTFUL JSON API', () => {
    // Index Test
    test('It should explain a list of users', async () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@johndoe.com',
            password: 'secure_password',
            role: 'teacher',
            campus: 'Emma Robertson Elementary',
            grade: 4,
            subjects: ['Math', 'Science', 'Reading', 'Writing'],
            teachers: [
                {
                    name: 'Teacher 1',
                    grade: 4,
                    subjects: ['Math'],
                    students: ['Student A', 'Student B']
                },
                {
                    name: 'Teacher 2',
                    grade: 4,
                    subjects: ['Science'],
                    students: ['Student C', 'Student D']
                }
            ],
            assignments: ['Assignment 1', 'Assignment 2'],
            completedAssignments: [
                {
                    assignment: 'Assignment 1',
                    completed: true
                },
                {
                    assignment: 'Assignment 2',
                    completed: false
                }
            ],
            students: [
                {
                    name: 'Student A',
                    grade: 4,
                    teachers: ['Teacher 1'],
                    subjects: ['Math']
                },
                {
                    name: 'Student B',
                    grade: 4,
                    teachers: ['Teacher 1'],
                    subjects: ['Math']
                },
                {
                    name: 'Student C',
                    grade: 4,
                    teachers: ['Teacher 2'],
                    subjects: ['Science']
                },
                {
                    name: 'Student D',
                    grade: 4,
                    teachers: ['Teacher 2'],
                    subjects: ['Science']
                }
            ]
        });
        await user.save();

        const response = await request(app).get('/campus');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        
        for (let i = 0; i < response.body.length; i++) {
            expect(response.body[i]).toHaveProperty('name');
            expect(response.body[i]).toHaveProperty('email');
            expect(response.body[i]).toHaveProperty('role');
            expect(response.body[i]).toHaveProperty('campus');
            expect(response.body[i]).toHaveProperty('grade');
            expect(response.body[i]).toHaveProperty('subjects');
            expect(response.body[i]).toHaveProperty('teachers');
            expect(response.body[i]).toHaveProperty('assignments');
            expect(response.body[i]).toHaveProperty('completedAssignments');
            expect(response.body[i]).toHaveProperty('students');
            expect(response.body[i].students).toEqual(expect.any(Array));
        }
    });
});
