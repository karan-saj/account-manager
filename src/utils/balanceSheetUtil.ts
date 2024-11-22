import { BalanceSheetPayload } from '../types/balanceSheet';
import { CustomError } from './customError';
import { validateGetBalanceSheetReportParams } from '../validators/balanceSheetValidator';

/**
 * Utility class for balance sheet
 */

/**
 * Extract and validate if parameters passed for balance sheet report are valid
 * @param queryParams 
 * @returns 
 */
export const extractAndValidateGetBalanceSheetReportParams = (queryParams: any): BalanceSheetPayload => {
  // Extract query params
  const { date, periods, timeframe, trackingOptionID1, trackingOptionID2, standardLayout, paymentsOnly } = queryParams;

  // Construct the params object
  const params = {
    date,
    periods,
    timeframe,
    trackingOptionID1,
    trackingOptionID2,
    standardLayout,
    paymentsOnly,
  };

  // Validate parameters 
  const validationResult = validateGetBalanceSheetReportParams(params);
  if (!validationResult.success) {
    throw new CustomError('INVALID_PARAMETERS', 400, 'Invalid query parameters');
  }

  // Construct and return the payload
  const payload: BalanceSheetPayload = {
    date,
    periods: periods ? Number(periods) : undefined,
    timeframe,
    trackingOptionID1,
    trackingOptionID2,
    standardLayout: standardLayout === 'true',
    paymentsOnly: paymentsOnly === 'true',
  };

  return payload;
};

/**
 * Validate authorization token is valid or not
 * @param token authorization token
 */
export const validateOauthToken = (token: string | undefined) => {
  if (!token || !token.startsWith('Bearer ')) {
    throw new CustomError('UNAUTHORIZED', 401, 'Missing or invalid OAuth token');
  }
}
