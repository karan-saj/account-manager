import { extractAndValidateGetBalanceSheetReportParams } from '../../src/utils/balanceSheetUtil';
import { CustomError } from '../../src/utils/customError';

describe('tests balance sheet validation util', () => {
  it('should validate and return parameters', () => {
    const query = {
      paymentsOnly: 'true',
      periods: '10',
    };

    const result = extractAndValidateGetBalanceSheetReportParams(query);

    expect(result).toEqual({
      "date": undefined,
      "paymentsOnly": true,
      "periods": 10,
      "standardLayout": false,
      "timeframe": undefined,
      "trackingOptionID1": undefined,
      "trackingOptionID2": undefined,
    });
  });

  it('should throw CustomError on invalid parameters', () => {
    const query = {
      paymentsOnly: 'invalid', // Invalid boolean
    };

    expect(() => extractAndValidateGetBalanceSheetReportParams(query)).toThrow(CustomError);
  });

  it('should handle missing optional parameters', () => {
    const query = {};

    const result = extractAndValidateGetBalanceSheetReportParams(query);

    expect(result).toEqual({
        "date": undefined,
        "paymentsOnly": false,
        "periods": undefined,
        "standardLayout": false,
        "timeframe": undefined,
        "trackingOptionID1": undefined,
       "trackingOptionID2": undefined,
    });
    });
});
