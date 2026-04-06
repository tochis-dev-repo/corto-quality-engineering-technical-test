import { APIResponse, TestInfo } from '@playwright/test';

export class ReportHelpers {
  static async attachApiExchange(
    testInfo: TestInfo,
    label: string,
    requestPayload: unknown,
    response: APIResponse
  ): Promise<void> {
    const responseText = await response.text();

    const payload = {
      requestPayload,
      statusCode: response.status(),
      statusText: response.statusText(),
      responseBody: ReportHelpers.parseResponseBody(responseText),
    };

    await testInfo.attach(label, {
      body: Buffer.from(JSON.stringify(payload, null, 2), 'utf-8'),
      contentType: 'application/json',
    });
  }

  private static parseResponseBody(responseText: string): unknown {
    try {
      return JSON.parse(responseText);
    } catch {
      return responseText;
    }
  }
}
