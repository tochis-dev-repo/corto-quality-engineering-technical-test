import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseClient } from './BaseClient';

export interface AuthCredentials {
  username: string;
  password: string;
}

export class AuthClient extends BaseClient {
  constructor(request: APIRequestContext, baseUrl?: string) {
    super(request, baseUrl);
  }

  async createToken(credentials: AuthCredentials): Promise<APIResponse> {
    return this.post('/auth', credentials, {
      'Content-Type': 'application/json',
    });
  }
}