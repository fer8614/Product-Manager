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

    it('should validate that the price ir greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Mouse - Test',
            price: 0
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    });

    it('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Mouse - Test',
            price: 'hello'
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(4);
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

describe('GET /api/products', () => {

    it('Should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(404);
    })
    it('should get a JSON response with products', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);

        expect(response.body).not.toHaveProperty('errors');
    })
})


