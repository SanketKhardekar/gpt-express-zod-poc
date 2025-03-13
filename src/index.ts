import express from 'express';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import winston from 'winston';

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

app.use('/api/chat', chatRoutes);

// Error Handling Middleware
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

const errorHandler = (err: any, req: express.Request, res: express.Response, next: any) => {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
};

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});