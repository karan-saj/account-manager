import { z } from 'zod';
import { ValidationResult } from '../types/validationResult';

// Define the Zod schema for balance sheet parameters
export const balanceSheetSchema = z.object({
  date: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})$/, 'Invalid date format. Use YYYY-MM-DD').optional(), // Optional date in YYYY-MM-DD format
  periods: z
    .string()
    .transform((val) => Number(val)) // Convert string to number
    .refine((val) => val >= 1 && val <= 11, {
      message: 'Periods must be an integer between 1 and 11.',
    })
    .optional(), // Optional, integer between 1 and 11
  timeframe: z.enum(['MONTH', 'QUARTER', 'YEAR']).optional(), // Optional, one of these values
  trackingOptionID1: z.string().optional(), // Optional string
  trackingOptionID2: z.string().optional(), // Optional string
  standardLayout: z.union([z.literal(true), z.literal(false)]).optional(), // Optional boolean
  paymentsOnly: z.union([z.literal(true), z.literal(false)]).optional(), // Optional boolean
});

// Modify validateBalanceSheetParams to return ValidationResult
export const validateBalanceSheetParams = (params: any): ValidationResult => {
  try {
    // Validate the params using Zod
    balanceSheetSchema.parse(params);
    return { success: true };  // Return success if validation passes
  } catch (error) {
    // Return failure with message if validation fails
    return { success: false, message: error instanceof Error ? error.message : 'Validation failed' };
  }
};

