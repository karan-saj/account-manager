import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { config } from '../config';

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
