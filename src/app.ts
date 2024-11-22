import express, { Request, Response } from 'express'; // Import necessary types
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Default Route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Account Manager!');
});

// Start the Server
const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
