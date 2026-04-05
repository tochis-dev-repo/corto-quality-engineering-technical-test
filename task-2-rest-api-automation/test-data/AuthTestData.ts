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
    },
    {
      description: 'missing password',
      requestBody: {
        username: 'admin',
      },
      expectedStatus: 200,
    },
    {
      description: 'missing username',
      requestBody: {
        password: 'password123',
      },
      expectedStatus: 200,
    },
    {
      description: 'empty auth payload',
      requestBody: {},
      expectedStatus: 200,
    },
    {
      description: 'invalid credential types',
      requestBody: {
        username: 123,
        password: true,
      },
      expectedStatus: 200,
    },
  ],
};