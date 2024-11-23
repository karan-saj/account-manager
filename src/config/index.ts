import dotenv from 'dotenv';

// Load the correct .env file by default config runs on prod
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'prod'}` });

export const config = {
  environment: process.env.NODE_ENV || 'prod',
  port: parseInt(process.env.PORT || '8080', 10),
  xeroApiUrl: process.env.XERO_API_URL || '',
  xeroClientId: process.env.XERO_CLIENT_ID || '',
  xeroClientSecret: process.env.XERO_CLIENT_SECRET || '',
  retryCount: process.env.RETRY_COUNT || 3,
  apiToken: process.env.XERO_API_TOKEN || '',
};

// Log the environment configuration
console.log(`Loaded environment: ${config.environment}`);
