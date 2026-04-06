import { expect, test } from '@playwright/test';
import { BookingClient, BookingData } from '../api-clients/BookingClient';
import { AuthClient } from '../api-clients/AuthClient';
import { AssertionHelpers } from '../utils/AssertionHelpers';
import { ReportHelpers } from '../utils/ReportHelpers';
import { ResponseHelpers } from '../utils/ResponseHelpers';
import { bookingTestData } from '../test-data/BookingTestData';
import { authTestData } from '../test-data/AuthTestData';

test.describe('Booking API Tests', () => {
  test('should return booking ids', async ({ request }, testInfo) => {
    const bookingClient = new BookingClient(request);

    const response = await bookingClient.getBookingIds();

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-get-ids',
      null,
      response
    );

    AssertionHelpers.expectStatus(
      response,
      200,
      'Expected get booking ids request to return 200'
    );

    const body = await ResponseHelpers.getJson<any[]>(response);
    expect(Array.isArray(body), 'Expected booking ids response to be an array').toBe(true);
  });

  bookingTestData.valid.forEach((testCase) => {
    test(`should create booking successfully: ${testCase.description}`, async ({ request }, testInfo) => {
      const bookingClient = new BookingClient(request);

      const response = await bookingClient.createBooking(
        testCase.requestBody as BookingData
      );

      await ReportHelpers.attachApiExchange(
        testInfo,
        'booking-create-valid',
        testCase.requestBody,
        response
      );

      AssertionHelpers.expectStatus(
        response,
        testCase.expectedStatus,
        `Expected booking creation to return ${testCase.expectedStatus}`
      );

      await AssertionHelpers.expectResponseToHaveProperties(response, [
        'bookingid',
        'booking',
      ]);

      const firstname = await ResponseHelpers.getNestedField<string>(
        response,
        'booking.firstname'
      );

      expect(
        firstname,
        'Expected created booking firstname to match request data'
      ).toBe(testCase.requestBody.firstname);
    });
  });

  bookingTestData.invalid.forEach((testCase) => {
    test(`should handle invalid booking creation: ${testCase.description}`, async ({ request }, testInfo) => {
      const bookingClient = new BookingClient(request);

      const response = await bookingClient.createBooking(testCase.requestBody as any);

      await ReportHelpers.attachApiExchange(
        testInfo,
        'booking-create-invalid',
        testCase.requestBody,
        response
      );

      AssertionHelpers.expectStatus(
        response,
        testCase.expectedStatus,
        `Expected invalid booking creation to return ${testCase.expectedStatus}`
      );
    });
  });

  test('should create and retrieve booking by id', async ({ request }, testInfo) => {
    const bookingClient = new BookingClient(request);
    const bookingData = bookingTestData.valid[0].requestBody as BookingData;

    const createResponse = await bookingClient.createBooking(bookingData);

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-create-for-retrieve',
      bookingData,
      createResponse
    );

    AssertionHelpers.expectStatus(
      createResponse,
      200,
      'Expected booking creation to return 200'
    );

    const bookingId = await ResponseHelpers.getField<number>(
      createResponse,
      'bookingid'
    );

    const getResponse = await bookingClient.getBookingById(bookingId);

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-get-by-id',
      { bookingId },
      getResponse
    );

    AssertionHelpers.expectStatus(
      getResponse,
      200,
      'Expected get booking by id to return 200'
    );

    await AssertionHelpers.expectResponseToHaveProperties(getResponse, [
      'firstname',
      'lastname',
      'totalprice',
      'depositpaid',
      'bookingdates',
    ]);

    const retrievedFirstname = await ResponseHelpers.getField<string>(
      getResponse,
      'firstname'
    );

    expect(
      retrievedFirstname,
      'Expected retrieved booking firstname to match created booking'
    ).toBe(bookingData.firstname);
  });

  test('should update an existing booking', async ({ request }, testInfo) => {
    const authClient = new AuthClient(request);
    const bookingClient = new BookingClient(request);

    const validAuth = authTestData.valid[0].requestBody;
    const originalBooking = bookingTestData.valid[0].requestBody as BookingData;
    const updatedBooking = bookingTestData.valid[1].requestBody as BookingData;

    const authResponse = await authClient.createToken(validAuth);

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-update-auth',
      validAuth,
      authResponse
    );

    AssertionHelpers.expectStatus(
      authResponse,
      authTestData.valid[0].expectedStatus,
      'Expected auth token creation to return 200'
    );

    const token = await ResponseHelpers.getField<string>(authResponse, 'token');

    const createResponse = await bookingClient.createBooking(originalBooking);

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-update-create-original',
      originalBooking,
      createResponse
    );

    AssertionHelpers.expectStatus(
      createResponse,
      200,
      'Expected booking creation to return 200'
    );

    const bookingId = await ResponseHelpers.getField<number>(
      createResponse,
      'bookingid'
    );

    const updateResponse = await bookingClient.updateBooking(
      bookingId,
      updatedBooking,
      token
    );

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-update-put',
      { bookingId, updatedBooking },
      updateResponse
    );

    AssertionHelpers.expectStatus(
      updateResponse,
      200,
      'Expected full booking update to return 200'
    );

    const updatedFirstname = await ResponseHelpers.getField<string>(
      updateResponse,
      'firstname'
    );

    expect(
      updatedFirstname,
      'Expected updated firstname to match update payload'
    ).toBe(updatedBooking.firstname);
  });

  test('should partially update an existing booking', async ({ request }, testInfo) => {
    const authClient = new AuthClient(request);
    const bookingClient = new BookingClient(request);

    const validAuth = authTestData.valid[0].requestBody;
    const originalBooking = bookingTestData.valid[0].requestBody as BookingData;

    const partialUpdateData = {
      firstname: 'UpdatedFirstName',
      additionalneeds: 'Dinner',
    };

    const authResponse = await authClient.createToken(validAuth);

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-partial-update-auth',
      validAuth,
      authResponse
    );

    AssertionHelpers.expectStatus(
      authResponse,
      authTestData.valid[0].expectedStatus,
      'Expected auth token creation to return 200'
    );

    const token = await ResponseHelpers.getField<string>(authResponse, 'token');

    const createResponse = await bookingClient.createBooking(originalBooking);

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-partial-update-create-original',
      originalBooking,
      createResponse
    );

    AssertionHelpers.expectStatus(
      createResponse,
      200,
      'Expected booking creation to return 200'
    );

    const bookingId = await ResponseHelpers.getField<number>(
      createResponse,
      'bookingid'
    );

    const patchResponse = await bookingClient.partialUpdateBooking(
      bookingId,
      partialUpdateData,
      token
    );

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-partial-update-patch',
      { bookingId, partialUpdateData },
      patchResponse
    );

    AssertionHelpers.expectStatus(
      patchResponse,
      200,
      'Expected partial booking update to return 200'
    );

    const updatedFirstname = await ResponseHelpers.getField<string>(
      patchResponse,
      'firstname'
    );

    expect(
      updatedFirstname,
      'Expected patched firstname to match partial update data'
    ).toBe(partialUpdateData.firstname);
  });

  test('should delete an existing booking', async ({ request }, testInfo) => {
    const authClient = new AuthClient(request);
    const bookingClient = new BookingClient(request);

    const validAuth = authTestData.valid[0].requestBody;
    const bookingData = bookingTestData.valid[0].requestBody as BookingData;

    const authResponse = await authClient.createToken(validAuth);

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-delete-auth',
      validAuth,
      authResponse
    );

    AssertionHelpers.expectStatus(
      authResponse,
      authTestData.valid[0].expectedStatus,
      'Expected auth token creation to return 200'
    );

    const token = await ResponseHelpers.getField<string>(authResponse, 'token');

    const createResponse = await bookingClient.createBooking(bookingData);

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-delete-create',
      bookingData,
      createResponse
    );

    AssertionHelpers.expectStatus(
      createResponse,
      200,
      'Expected booking creation to return 200'
    );

    const bookingId = await ResponseHelpers.getField<number>(
      createResponse,
      'bookingid'
    );

    const deleteResponse = await bookingClient.deleteBooking(bookingId, token);

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-delete',
      { bookingId },
      deleteResponse
    );

    AssertionHelpers.expectStatus(
      deleteResponse,
      201,
      'Expected booking deletion to return 201'
    );

    const getDeletedBookingResponse = await bookingClient.getBookingById(bookingId);

    await ReportHelpers.attachApiExchange(
      testInfo,
      'booking-get-deleted-by-id',
      { bookingId },
      getDeletedBookingResponse
    );

    AssertionHelpers.expectStatus(
      getDeletedBookingResponse,
      404,
      'Expected deleted booking lookup to return 404'
    );
  });
});