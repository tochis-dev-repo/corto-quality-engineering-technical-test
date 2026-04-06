export const bookingTestData = {
  valid: [
    {
      description: 'valid booking with breakfast',
      requestBody: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-01-01',
          checkout: '2024-01-05',
        },
        additionalneeds: 'Breakfast',
      },
      expectedStatus: 200,
    },
    {
      description: 'valid booking with late checkout',
      requestBody: {
        firstname: 'Jane',
        lastname: 'Smith',
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
          checkin: '2024-02-10',
          checkout: '2024-02-15',
        },
        additionalneeds: 'Late Checkout',
      },
      expectedStatus: 200,
    },
  ],

  invalid: [
    {
      description: 'missing firstname',
      requestBody: {
        lastname: 'Doe',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-01-01',
          checkout: '2024-01-05',
        },
      },
      expectedStatus: 400,
    },
    {
      description: 'invalid checkin date format',
      requestBody: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: 'invalid-date',
          checkout: '2024-01-05',
        },
      },
      expectedStatus: 400,
    },
    {
      description: 'totalprice has wrong type',
      requestBody: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 'not-a-number',
        depositpaid: true,
        bookingdates: {
          checkin: '2024-01-01',
          checkout: '2024-01-05',
        },
      },
      expectedStatus: 400,
    },
    {
      description: 'empty booking payload',
      requestBody: {},
      expectedStatus: 400,
    },
  ],
};