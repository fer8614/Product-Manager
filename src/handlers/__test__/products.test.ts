import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {
    it('should display validations errors', async () => {
        const response = await request(server).post('/api/products').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    });

    it('should create a new products', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Mouse - Test',
            price: 51
        })

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('name', 'Mouse - Test');
        expect(response.body.data).toHaveProperty('price', 51);

        expect(response.body.data).not.toHaveProperty('errors');
        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
      
    })
})


