import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseClient } from './BaseClient';

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface BookingData {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}

export interface BookingSearchParams {
  firstname?: string;
  lastname?: string;
  checkin?: string;
  checkout?: string;
}

export class BookingClient extends BaseClient {
  constructor(request: APIRequestContext, baseUrl?: string) {
    super(request, baseUrl);
  }

  async getBookingIds(searchParams?: BookingSearchParams): Promise<APIResponse> {
    const queryString = this.buildQueryString(searchParams);
    const path = queryString ? `/booking?${queryString}` : '/booking';

    return this.get(path);
  }

  async getBookingById(bookingId: number): Promise<APIResponse> {
    return this.get(`/booking/${bookingId}`);
  }

  async createBooking(bookingData: BookingData): Promise<APIResponse> {
    return this.post('/booking', bookingData, {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  async updateBooking(
    bookingId: number,
    bookingData: BookingData,
    token: string
  ): Promise<APIResponse> {
    return this.put(`/booking/${bookingId}`, bookingData, {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${token}`,
    });
  }

  async partialUpdateBooking(
    bookingId: number,
    partialBookingData: Partial<BookingData>,
    token: string
  ): Promise<APIResponse> {
    return this.patch(`/booking/${bookingId}`, partialBookingData, {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${token}`,
    });
  }

  async deleteBooking(bookingId: number, token: string): Promise<APIResponse> {
    return this.delete(`/booking/${bookingId}`, {
      Cookie: `token=${token}`,
    });
  }

  private buildQueryString(searchParams?: BookingSearchParams): string {
    if (!searchParams) {
      return '';
    }

    const filteredParams = Object.entries(searchParams).reduce<Record<string, string>>(
      (accumulator, [key, value]) => {
        if (value !== undefined) {
          accumulator[key] = value;
        }
        return accumulator;
      },
      {}
    );

    return new URLSearchParams(filteredParams).toString();
  }
}