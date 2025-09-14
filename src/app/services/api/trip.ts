import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Constants } from '../../config/constants';
import { TripGetResponse } from '../../model/trip_get_res';

@Injectable({
  providedIn: 'root',
})
export class Trip {
  constructor(private constants: Constants, private http: HttpClient) {}

  public async getTrip(options?: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(this.http.get(url));
    return response as TripGetResponse[];
  }

  public async getTripByID(id: number): Promise<TripGetResponse | null> {
    const url = `${this.constants.API_ENDPOINT}/trip/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    return response as TripGetResponse;
  }

  public async getOneTrip(id: number): Promise<TripGetResponse | null> {
    const url = `${this.constants.API_ENDPOINT}/trip/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    return response as TripGetResponse;
  }

  public async getTripByName(name: string, options?: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(
      this.http.get(url, {
        params: {
          name: name,
        },
      })
    );
    return response as TripGetResponse[];
  }

  public async addNewTrip(trip: any, options?: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(this.http.post(url, trip));
    return response;
  }

  public async deleteTrip(id: number) {
    const url = `${this.constants.API_ENDPOINT}/trip/${id}`;
    const response = await lastValueFrom(this.http.delete(url));
    return response;
  }

  public async updateTrip(id: number, trip: any) {
    const url = `${this.constants.API_ENDPOINT}/trip/${id}`;
    const response = await lastValueFrom(this.http.put(url, trip));
    return response;
  }

  public async getTripByCountry(country: string): Promise<TripGetResponse[]> {
    const trips = await this.getTrip(); // get all trips
    return trips.filter((t) => t.country === country);
  }
}
