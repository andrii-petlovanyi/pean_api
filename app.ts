import express, { Application, Response } from 'express';
import cors from 'cors';
import logger from 'morgan'
import dotenv from 'dotenv'
import { errorsHandler } from './helpers/errorsHandler';
import { db } from './db/config';


dotenv.config()

const app: Application = express();

const typeLogger = app.get('env') === 'development' ? 'dev' : 'short';
const PORT = process.env.PORT || 5005;

app.use(logger(typeLogger));
app.use(cors());

app.use(express.json());


app.use((_, res: Response) => {
    res.status(404).json({ message: 'Sorry, but this resource not found' });
});

app.use(errorsHandler);

const start = async () => {
    try {

        await db.connect()
        console.log('Connected to PostgreSQL database');

        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    } catch (error) {
        console.log('\x1B[31mDatabase connection failed', error);
        process.exit(1);
    }
};

start();