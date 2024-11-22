/**
 * Custom error class
 */
export class CustomError extends Error {
    public statusCode: number;
    public errorCode: string;
    public details: any;
  
    constructor(message: string, statusCode: number, errorCode: string, details?: any) {
      super(message);
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      this.details = details;
      this.name = this.constructor.name;
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  