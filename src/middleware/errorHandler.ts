import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';

/**
 * Global error handler middleware.
 * @param err Custom Error
 * @returns 
 */
export const globalErrorHandler = (
  err: Error | CustomError, 
  _req: Request, res: Response,
  _next: NextFunction ): any => {
  // Handle CustomError
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.errorCode,
        message: err.message,
        details: err.details || null,
      },
    });
  }

  // Handle unexpected errors
  console.error('Unexpected Error:', err);

  return res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong. Please try again later.',
    },
  });
};
