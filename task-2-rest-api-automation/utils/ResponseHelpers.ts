import { APIResponse } from '@playwright/test';

export class ResponseHelpers {
  static async getJson<T = any>(response: APIResponse): Promise<T> {
    return await response.json();
  }

  static async getField<T = any>(
    response: APIResponse,
    field: string
  ): Promise<T> {
    const body = await response.json();
    return body[field];
  }

  static async getNestedField<T = any>(
    response: APIResponse,
    path: string
  ): Promise<T> {
    const body = await response.json();

    return path.split('.').reduce((current: any, key: string) => {
      return current?.[key];
    }, body);
  }
}