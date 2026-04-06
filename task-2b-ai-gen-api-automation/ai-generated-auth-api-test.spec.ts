import { test, expect } from '@playwright/test';

// Base URL for the Restful Booker API
const BASE_URL = 'https://restful-booker.herokuapp.com';
//QE Notes (1a): A hard coded base url means we can't easily switch between different environment configurations.
//QE Recommendation (1a): Switch to using environment variables. Easier to maintain, easier to test multiple environmennts, easier to put on the pipeline.

test.describe('Auth Endpoint - POST /auth', () => {

  /**
   * POSITIVE TEST SCENARIO
   * Validates that a token is returned when providing correct credentials.
   */
  test('should return a token with valid credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });
    //QE Notes (1b): Hard coded credentials do not support a data driven testing approach.
    //QE Notes (1b): This will make the test suite harder to maintain and scale. 
    //QE Recommendation (1b): Use a data driven test data set. This will allow us to easily add more test cases in the future without modifying the test logic.

    // Validate Status Code
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Validate a token is present in the response
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);

    //QE Notes (1c): The expect method does not have any proper error messages when an assertion fails. 
    //QE Notes (1c): This makes it harder to debug test failures and understand what went wrong.
    //QE Recommendation (1c): Use custom error messages in assertions to provide as much context as you can when a test fails. This will make it easier to identify the root cause of the failure and fix it quickly.
  });

  /**
   * NEGATIVE TEST SCENARIO
   * Validates that a failure message is returned for incorrect credentials.
   */
  test('should return "Bad credentials" for invalid password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: {
        username: 'admin',
        password: 'wrongpassword',
      },
    });
    //QE Notes (2a): See QE Notes (1a) and (1b) for hard coded values.

    // The API returns 200 OK even for failed auth, but with a specific reason in the body
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Validate failure message
    expect(body.reason).toBe('Bad credentials');
  });

  /**
   * NEGATIVE TEST SCENARIO
   * Validates behavior when username does not exist.
   */
  test('should return "Bad credentials" for non-existent user', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: {
        username: 'fakeUser',
        password: 'password123',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
  });
});

/**
 * QE Notes General Summary:
 * The lack of proper seperation of concerns (environment configuration, test data management, and test logic) makes the test suite harder to maintain and scale.
* The lack of custom error messages in assertions makes it harder to debug test failures and understand what went wrong. 
* API endpoint URLs, response data, and status codes change all the time. A single change will result in multiple tests needing to be refactored.

* For a proper implementation of my observations, please refer to task-2-rest-api-automation.  
 */