export const authTestData = {
  valid: [
    {
      description: 'valid admin credentials',
      requestBody: {
        username: 'admin',
        password: 'password123',
      },
      expectedStatus: 200,
    },
  ],

  invalid: [
    {
      description: 'wrong password',
      requestBody: {
        username: 'admin',
        password: 'wrongpassword',
      },
      expectedStatus: 200,
      expectedReason: 'Bad credentials',
    },
    {
      description: 'missing password',
      requestBody: {
        username: 'admin',
      },
      expectedStatus: 200,
      expectedReason: 'Bad credentials',
    },
    {
      description: 'missing username',
      requestBody: {
        password: 'password123',
      },
      expectedStatus: 200,
      expectedReason: 'Bad credentials',
    },
    {
      description: 'empty payload',
      requestBody: {},
      expectedStatus: 200,
      expectedReason: 'Bad credentials',
    },
    {
      description: 'invalid data types',
      requestBody: {
        username: 123,
        password: true,
      },
      expectedStatus: 200,
      expectedReason: 'Bad credentials',
    },
  ],
};