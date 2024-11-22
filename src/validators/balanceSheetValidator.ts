import { z } from 'zod';
import { ValidationResult } from '../types/commonTypes';

/**
 * Validate get balance sheet report schema
 */
export const getBalanceSheetReportSchema = z.object({
  date: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})$/, 'Invalid date format. Use YYYY-MM-DD').optional(), // Optional, date in YYYY-MM-DD format
  periods: z
    .string()
    .transform((val) => Number(val)) // Convert string to number
    .refine((val) => val >= 1 && val <= 11, {
      message: 'Periods must be an integer between 1 and 11.',
    })
    .optional(), // Optional, integer between 1 and 11
  timeframe: z.enum(['MONTH', 'QUARTER', 'YEAR']).optional(), // Optional, one of these values
  trackingOptionID1: z.string().optional(), // Optional, string
  trackingOptionID2: z.string().optional(), // Optional, string
  paymentsOnly: z.union([z.literal('true'), z.literal('false')]).optional(), // Optional, boolean
  standardLayout: z.union([z.literal('true'), z.literal('false')]).optional(), // Optional, boolean
});

/**
 * validate query params for get balance sheet reports
 * @param params query params
 * @returns 
 */
export const validateGetBalanceSheetReportParams = (params: any): ValidationResult => {
  try {
    getBalanceSheetReportSchema.parse(params);
    return { success: true };
  } catch (error) {
    // throw error if validation fails
    return { success: false, message: error instanceof Error ? error.message : 'Validation failed' };
  }
};

