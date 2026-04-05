import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseClient {
  constructor(protected request: APIRequestContext) {}

  protected async get(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.get(url, {
      headers,
    });
  }

  protected async post(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.post(url, {
      data,
      headers,
    });
  }

  protected async put(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.put(url, {
      data,
      headers,
    });
  }

  protected async patch(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.patch(url, {
      data,
      headers,
    });
  }

  protected async delete(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.delete(url, {
      headers,
    });
  }
}