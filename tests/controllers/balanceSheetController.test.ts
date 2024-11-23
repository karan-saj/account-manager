import request from 'supertest';
import express from 'express';
import balanceSheetRoutes from '../../src/routes/balanceSheetRoutes';
import { globalErrorHandler } from '../../src/middleware/errorHandler';

const app = express();
app.use(express.json());
app.use('/balanceSheet', balanceSheetRoutes);

app.use(globalErrorHandler);

describe('tests balance sheet controller', () => {
  it('should return 200 OK for valid parameters', async () => {
    const response = await request(app)
      .get('/balanceSheet/reports?paymentsOnly=true')
      .set('Authorization', 'Bearer valid-token');

    expect(response.status).toBe(200);
    expect(response.body.Reports).toBeDefined();
  });

  it('should return 400 for invalid parameters', async () => {
    const response = await request(app)
      .get('/balanceSheet/reports?paymentsOnly=invalid')
      .set('Authorization', 'Bearer valid-token');

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('Invalid query parameters');
  });

  it('should return 401 if Authorization header is not provided', async () => {
    const response = await request(app)
      .get('/balanceSheet/reports?paymentsOnly=true');

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('Missing or invalid OAuth token');
  });
});
