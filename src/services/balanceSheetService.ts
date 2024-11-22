import { httpClient } from '../utils/restClient';
import { BalanceSheetPayload, BalanceSheetResponse } from '../types/balanceSheet';
import { CustomError } from '../utils/customError';
import { config } from '../config';
import { GET_BALANCE_SHEET_PATH } from '../const/commonConst';

/**
 * Manages operations related to Balance Sheet
 */
export class BalanceSheetService {

  /**
   * Gets balance sheet report from external service
   * @param payload optional parameters
   * @returns Balance sheet report
   */
  public async getBalanceSheetData(payload: BalanceSheetPayload): Promise<any> {
    try {
      
      // API URL to get balance sheet report
      const url = config.xeroApiUrl + GET_BALANCE_SHEET_PATH;

      // http client get request
      const responseData = await httpClient({
        url,
        method: 'GET',
        data: payload,
        headers: {
          'Authorization': `Bearer ${config.apiToken}`,
          'Content-Type': 'application/json',
        }
      });

      return responseData as BalanceSheetResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Handle api failure
        throw new CustomError('API_CALL_FAILED', 500, error.message || 'An error occurred while fetching balance sheet data');
      }
      throw new CustomError('UNKNOWN_ERROR', 500, 'An unknown error occurred while fetching balance sheet data');
    }
  }
}
