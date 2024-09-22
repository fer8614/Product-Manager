import { connectDB } from "../server";
import db from '../config/db';

jest.mock('../config/db');
describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Error connect to DB'));

        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith( expect.stringContaining('Error connect to DB') );
    })
})

