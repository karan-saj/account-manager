import { BalanceSheetService } from '../../src/services/balanceSheetService';
import { httpClient } from '../../src/utils/restClient';

jest.mock('../../src/utils/restClient');
const mockedHttpClient = jest.mocked(httpClient);

describe('test balance sheet service', () => {
  let service: BalanceSheetService;

  beforeEach(() => {
    service = new BalanceSheetService();
  });

  it('should fetch balance sheet report', async () => {
    const payload = { paymentsOnly: true };
    const mockResponse = { report: 'data' };

    mockedHttpClient.mockResolvedValue(mockResponse);

    const result = await service.getBalanceSheetData(payload);

    expect(mockedHttpClient).toHaveBeenCalledWith({
      url: 'http://localhost:3000/api.xro/2.0/Reports/BalanceSheet',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json',
      },
      data: payload,
    });
    expect(result).toEqual(mockResponse);
  });

  it('should throw error api failure', async () => {
    mockedHttpClient.mockRejectedValue(new Error('HTTP Error'));

    await expect(service.getBalanceSheetData({ paymentsOnly: true })).rejects.toThrow(
      'API_CALL_FAILED'
    );
  });
});
