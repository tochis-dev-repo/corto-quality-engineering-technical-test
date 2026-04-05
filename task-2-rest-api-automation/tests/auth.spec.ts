import { expect, test } from '@playwright/test';
import { AuthClient } from '../api-clients/AuthClient';
import { AssertionHelpers } from '../utils/AssertionHelpers';
import { ResponseHelpers } from '../utils/ResponseHelpers';
import { authTestData } from '../test-data/AuthTestData';

test.describe('Auth API Tests', () => {
  // ✅ Positive CASES
  authTestData.valid.forEach((testCase) => {
    test(`should create token successfully: ${testCase.description}`, async ({ request }) => {
      const authClient = new AuthClient(request);

      const response = await authClient.createToken(testCase.requestBody);

      AssertionHelpers.expectStatus(
        response,
        testCase.expectedStatus,
        `Expected auth request to return ${testCase.expectedStatus}`
      );

      await AssertionHelpers.expectResponseToHaveProperties(response, ['token']);

      const token = await ResponseHelpers.getField<string>(response, 'token');

      expect(
        token,
        'Expected token to be present for valid credentials'
      ).toBeTruthy();

      expect(
        typeof token,
        'Expected token to be a string'
      ).toBe('string');

      expect(
        token.length,
        'Expected token to be non-empty'
      ).toBeGreaterThan(0);
    });
  });

  // ❌ Negative CASES
  authTestData.invalid.forEach((testCase) => {
    test(`should handle invalid auth request: ${testCase.description}`, async ({ request }) => {
      const authClient = new AuthClient(request);

      const response = await authClient.createToken(testCase.requestBody as any);

      AssertionHelpers.expectStatus(
        response,
        testCase.expectedStatus,
        `Expected invalid auth request to return ${testCase.expectedStatus}`
      );

      await AssertionHelpers.expectResponseToHaveProperties(response, ['reason']);

      const reason = await ResponseHelpers.getField<string>(response, 'reason');

      expect(
        reason,
        `Expected reason to equal '${testCase.expectedReason}'`
      ).toBe(testCase.expectedReason);
    });
  });
});