import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseClient {
  protected baseUrl: string;

  constructor(
    protected request: APIRequestContext,
    baseUrl?: string
  ) {
    this.baseUrl =
      baseUrl ||
      process.env.BASE_URL ||
      'https://restful-booker.herokuapp.com';
  }

  private buildUrl(path: string): string {
    return `${this.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  }

  protected async get(
    path: string,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.get(this.buildUrl(path), { headers });
  }

  protected async post(
    path: string,
    requestBody?: unknown,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.post(this.buildUrl(path), {
      data: requestBody,
      headers,
    });
  }

  protected async put(
    path: string,
    requestBody?: unknown,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.put(this.buildUrl(path), {
      data: requestBody,
      headers,
    });
  }

  protected async patch(
    path: string,
    requestBody?: unknown,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.patch(this.buildUrl(path), {
      data: requestBody,
      headers,
    });
  }

  protected async delete(
    path: string,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.delete(this.buildUrl(path), { headers });
  }
}