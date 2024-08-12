const request = require('supertest');
const { app, startServer } = require('../app');
const mongoose = require('mongoose');

let server;

beforeAll(() => {
    server = startServer();
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close(); // Close the server after tests
});

describe('Task Manager API', () => {
    // Test for GET /lists
    it('should get all lists', async () => {
        const res = await request(app).get('/lists');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test for POST /lists
    it('should create a new list', async () => {
        const res = await request(app)
            .post('/lists')
            .send({ title: 'New List' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('title', 'New List');
    });
});
