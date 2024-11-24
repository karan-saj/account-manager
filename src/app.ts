import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import balanceSheetRoutes from './routes/balanceSheetRoutes';
import { globalErrorHandler } from './middleware/errorHandler';

// Load environment
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3010;

app.use(cors({
    origin: 'http://localhost:8090',
    methods: ['GET'],
}));
app.use(express.json());

// Routes for balance sheet
app.use('/balanceSheet', balanceSheetRoutes);

// Health Check
app.get('/ping', (req: Request, res: Response) => {
  res.status(200).send({ message: 'pong' });
});

// Global Error Handler
app.use(globalErrorHandler);

// Starts the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
