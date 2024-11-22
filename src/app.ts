import express, { Request, Response, NextFunction } from 'express';
import { config } from './config'; // Importing the configuration
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(bodyParser.json()); // To parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // For URL-encoded payloads

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', environment: config.environment });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

// Start the Server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port} in ${config.environment} mode`);
});
