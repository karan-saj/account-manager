import { globalErrorHandler } from '../../src/middleware/errorHandler';
import { CustomError } from '../../src/utils/customError';

describe('test global error handler', () => {
  it('should handle CustomError', () => {
    const err = new CustomError('INVALID_PARAMETERS', 400, 'Invalid parameters');
    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    globalErrorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        code: 'Invalid parameters',
        message: 'INVALID_PARAMETERS',
        details: null,
      },
    });
  });

  it('should handle unexpected error', () => {
    const err = new Error('Unexpected error');
    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    globalErrorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong. Please try again later.',
      },
    });
  });
});
