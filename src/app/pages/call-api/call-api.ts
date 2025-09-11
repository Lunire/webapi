import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { lastValueFrom } from 'rxjs';
import { TripGetResponse } from '../../model/trip_get_res';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Trip } from '../../services/api/trip';

@Component({
  selector: 'app-call-api',
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatFormField,
    MatInput,
    RouterLink,
    MatCardModule,
    MatLabel
  ],
  templateUrl: './call-api.html',
  styleUrl: './call-api.scss',
})
export class CallApi {
  constructor(private http: HttpClient, private tripService: Trip) {}
  trips : TripGetResponse[] = [];

  ngOnInit(): void {
    this.loadDataAsync();
    console.log('Init State');
  }

  async loadDataAsync() {
    this.trips = await this.tripService.getTrip();
  }

  async callApi() {
    // const url = 'http://10.34.10.104:3000/trip';
    // let data = await lastValueFrom(this.http.get(url));
    // this.trips = data as TripGetResponse[];

    this.trips = await this.tripService.getTrip();

    console.log(this.trips);
    console.log(this.trips[0].name);

    console.log('Call Completed');
  }

  async findOne(input: HTMLInputElement) {
    // console.log(input.value);
    // const url = `http://10.34.10.104:3000/trip/${input.value}`;
    // let data = await lastValueFrom(this.http.get(url));
    // this.trips = [data as TripGetResponse];

    this.trips = [await this. tripService.getOneTrip(+input.value) as TripGetResponse];

    console.log(this.trips);
    console.log(this.trips[0].name);
    console.log('Call Completed');
  }

  async findName(input: HTMLInputElement) {
    console.log(input.value);

    // const url = 'http://localhost:3000/trip';
    // let data = await lastValueFrom(this.http.get(url));
    // const trips = data as TripGetResponse[];

    const trips = await this.tripService.getTripByName(input.value);

    this.trips = trips.filter(trip =>
      trip.name.toLowerCase().includes(input.value.toLowerCase())
    );
    console.log(this.trips);
    if (this.trips.length > 0) {
      console.log(this.trips[0].name);
    }
    console.log('Call Completed');
  }

  async deleteTrip(id: number) {
    if (!confirm('คุณต้องการลบใช่หรือไม่?')) return;

    try {
      const res = await this.tripService.deleteTrip(id);
      console.log(res);

      // อัปเดตรายการ trips ในจอ
      this.trips = this.trips.filter(t => t.idx !== id);

      alert('ลบสำเร็จ');
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาดในการลบ');
    }
  }
}
