import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';

//Connect to DB
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log( colors.blue.bold ('Connection has been established successfully.'));    
    } catch (error) {
        // console.log(error);
        console.log( colors.red.bold ('Error connect to DB'));
    }
}

connectDB();

const server = express();

server.use('/api/products', router);
export default server;