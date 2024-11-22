import { Request, Response, NextFunction } from 'express';
import { extractAndValidateGetBalanceSheetReportParams, validateOauthToken } from '../utils/balanceSheetUtil';
import { BalanceSheetService } from '../services/balanceSheetService';
import { BalanceSheetQueryParams } from '../types/balanceSheet'

export class BalanceSheetController {

  private balanceSheetService: BalanceSheetService;

  constructor() {
    this.balanceSheetService = new BalanceSheetService();
  }

  /**
   * Process request to report for balance sheet
   * @param req user request with optional parameters
   * @returns balance sheet report
   */
  public getBalanceSheetReport = async (
    req: Request<{}, {}, {}, BalanceSheetQueryParams>,
    res: Response, next: NextFunction ): Promise<any> => {
    try {
      // validate request
      validateOauthToken(req?.headers?.authorization);
      const payload = extractAndValidateGetBalanceSheetReportParams(req.query);
      // process request
      const responseData = await this.balanceSheetService.getBalanceSheetData(payload);
      return res.status(200).json(responseData);
    } catch (error) {
      // pass error to global error handler
      next(error);
    }
  };
}
