import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { config } from '../config';
import { CustomError } from './customError';

/**
 * Common HTTP Client option for REST calls
 * supports retry mechanisim
 */
interface HttpClientOptions {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  headers?: Record<string, string>;
  retries?: number;
}

export const httpClient = async (options: HttpClientOptions): Promise<any> => {
  const { url, method, data, headers, retries = Number(config.retryCount) } = options;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        data,
        headers,
      };

      const response: AxiosResponse = await axios(config);
      // Return response data if successful
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      // log error
      console.error(`Attempt ${attempt + 1} failed for ${url}:`, axiosError.message);

      if (attempt === retries - 1) {
        // Retry maxed out, throw error
        throw new Error(`Request to ${url} failed after ${retries} retries: ${axiosError.message}`);
      }
    }
  }
};

export const httpGetRequest = async (apiPath: string, parameters: any) => {
  try {
      
    // API URL to get balance sheet report
    const url = config.xeroApiUrl + apiPath;

    // http client get request
    const responseData = await httpClient({
      url,
      method: 'GET',
      data: parameters,
      headers: {
        'Authorization': `Bearer ${config.apiToken}`,
        'Content-Type': 'application/json',
      }
    });
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Handle api failure
      throw new CustomError('API_CALL_FAILED', 500, error.message || 'An error occurred while fetching balance sheet data');
    }
    throw new CustomError('UNKNOWN_ERROR', 500, 'An unknown error occurred while fetching balance sheet data');
  }
}
