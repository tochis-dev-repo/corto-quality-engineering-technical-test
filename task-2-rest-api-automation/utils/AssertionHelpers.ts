import { APIResponse, expect } from '@playwright/test';

export class AssertionHelpers {
  static expectStatus(
    response: APIResponse,
    expectedStatus: number,
    message?: string
  ): void {
    expect(
      response.status(),
      message || `Expected response status to be ${expectedStatus}.`
    ).toBe(expectedStatus);
  }

  static async expectJsonFieldToBeDefined(
    response: APIResponse,
    field: string
  ): Promise<void> {
    const body = await response.json();

    expect(
      body[field],
      `Expected response field '${field}' to be defined.`
    ).toBeDefined();
  }

  static async expectJsonFieldToEqual(
    response: APIResponse,
    field: string,
    expectedValue: unknown
  ): Promise<void> {
    const body = await response.json();

    expect(
      body[field],
      `Expected response field '${field}' to equal '${expectedValue}'.`
    ).toBe(expectedValue);
  }

  static async expectResponseToHaveProperties(
    response: APIResponse,
    properties: string[]
  ): Promise<void> {
    const body = await response.json();

    properties.forEach((property) => {
      expect(
        body,
        `Expected response to have property '${property}'.`
      ).toHaveProperty(property);
    });
  }

  static async expectErrorMessage(
    response: APIResponse,
    expectedMessage: string
  ): Promise<void> {
    const body = await response.json();

    expect(
      JSON.stringify(body),
      `Expected error response to include '${expectedMessage}'.`
    ).toContain(expectedMessage);
  }
}