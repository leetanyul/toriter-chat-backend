import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import axios, { AxiosError } from 'axios';
import {
  ResponseModel,
  ResponseCode,
} from '@/libs/shared/models/response.model';

@Injectable()
export class ApiUtil {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, any>,
  ): Promise<T> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<T>(url, { params, headers }),
      );
      return response.data;
    } catch (error: unknown) {
      this.handleAxiosError(error);
    }
  }

  async post<T>(
    url: string,
    data?: Record<string, any>,
    headers?: Record<string, any>,
  ): Promise<T> {
    try {
      const response = await lastValueFrom(
        this.httpService.post<T>(url, data, { headers }),
      );
      return response.data;
    } catch (error: unknown) {
      this.handleAxiosError(error);
    }
  }

  async put<T>(
    url: string,
    data?: Record<string, any>,
    headers?: Record<string, any>,
  ): Promise<T> {
    try {
      const response = await lastValueFrom(
        this.httpService.put<T>(url, data, { headers }),
      );
      return response.data;
    } catch (error: unknown) {
      this.handleAxiosError(error);
    }
  }

  async delete<T>(url: string, headers?: Record<string, any>): Promise<T> {
    try {
      const response = await lastValueFrom(
        this.httpService.delete<T>(url, { headers }),
      );
      return response.data;
    } catch (error: unknown) {
      this.handleAxiosError(error);
    }
  }

  getBearerTokenHeader(token: string): Record<string, string> {
    return { Authorization: `Bearer ${token}` };
  }

  private handleAxiosError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || HttpStatus.BAD_GATEWAY;
      const message =
        (error.response?.data as any)?.error ||
        (error.response?.data as any)?.message ||
        error.message ||
        'External API Error';

      throw new HttpException(
        ResponseModel.error(ResponseCode.INTERNAL_API_ERROR, message),
        status,
      );
    }

    throw new HttpException(
      ResponseModel.fail('Unexpected error occurred'),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
