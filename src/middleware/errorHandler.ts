import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError'; // Import CustomError for structured errors

/**
 * Global error handling middleware.
 */
const globalErrorHandler = (
  err: Error | CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  // Handle CustomError instances with predefined structure
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.errorCode,
        message: err.message,
        details: err.details || null,
      },
    });
  }

  // Handle generic errors
  console.error('Unexpected Error:', err); // Log the error for debugging

  return res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong. Please try again later.',
    },
  });
};

export {
  globalErrorHandler,
}
