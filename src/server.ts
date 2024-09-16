import express from 'express';
import router from './router';
import db from './config/db';

//Connect to DB
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log('Connection has been established successfully.');    
    } catch (error) {
        console.log(error);
        console.log('Error connect to DB');
    }
}

connectDB();

const server = express();

server.use('/api/products', router);
export default server;