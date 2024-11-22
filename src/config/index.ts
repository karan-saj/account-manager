import dotenv from 'dotenv';

// Dynamically load the correct .env file
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

export const config = {
  environment: process.env.NODE_ENV || 'local',
  port: parseInt(process.env.PORT || '3010', 10),
  xeroApiUrl: process.env.XERO_API_URL || '',
  xeroClientId: process.env.XERO_CLIENT_ID || '',
  xeroClientSecret: process.env.XERO_CLIENT_SECRET || '',
  retryCount: process.env.RETRY_COUNT || 3,
};

// Log to verify the environment configuration
console.log(`Loaded environment: ${config.environment}`);
