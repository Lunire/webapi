import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TripGetResponse } from '../../model/trip_get_res';
import { Trip } from '../../services/api/trip';

@Component({
  selector: 'app-delete',
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './delete.html',
  styleUrl: './delete.scss',
})
export class Delete {
  constructor(private http: HttpClient, private tripService: Trip) {}
  trips: TripGetResponse[] = [];

  async callApi() {
    // const url = 'http://localhost:3000/trip';
    // let data = await lastValueFrom(this.http.get(url));
    // this.trips = data as TripGetResponse[];
    this.trips = await this.tripService.getTrip();
    console.log(this.trips);
    console.log(this.trips[0].name);
    console.log('Call Completed');
  }

  async findOne(input: HTMLInputElement) {
    // console.log(input.value);
    // const url = `http://localhost:3000/trip/${input.value}`;
    // let data = await lastValueFrom(this.http.get(url));
    // this.trips = [data as TripGetResponse];
    this.trips = [
      (await this.tripService.getOneTrip(+input.value)) as TripGetResponse,
    ];
    console.log(this.trips);
    console.log(this.trips[0].name);
    console.log('Call Completed');
  }

  async deleteTrip(id: number) {
  try {
    // เรียก API ลบ
    await this.tripService.deleteTrip(id);
    console.log(`Trip ${id} deleted successfully`);

    // อัปเดต frontend list ทันที
    this.trips = this.trips.filter((t) => t.id !== id);
  } catch (error) {
    console.error('Delete failed:', error);
  }
}
}
