// tests/contact.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Contact = require('../models/contact');

describe('Contact API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await Contact.deleteMany({});
    });

    it('should create a new contact', async () => {
        const res = await request(app)
            .post('/api/contacts')
            .send({
                name: 'John Doe',
                numbers: ['1234567890']
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should fetch all contacts', async () => {
        const res = await request(app).get('/api/contacts');
        expect(res.statusCode).toEqual(200);
    });

    it('should search contacts by name', async () => {
        await request(app)
            .post('/api/contacts')
            .send({
                name: 'Jane Doe',
                numbers: ['0987654321']
            });
        const res = await request(app).get('/api/search/Jane');
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].name).toEqual('Jane Doe');
    });
});
