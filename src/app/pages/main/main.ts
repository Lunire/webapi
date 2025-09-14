import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { TripGetResponse } from '../../model/trip_get_res';
import { Trip } from '../../services/api/trip';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatFormField,
    MatInput,
    RouterLink,
    MatCardModule,
    MatLabel,
    MatSelectModule,
    MatProgressSpinner,
    MatIcon
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  constructor(private http: HttpClient, private tripService: Trip) {}
  trips: TripGetResponse[] = [];
  countries: string[] = [];
  loading = false;

  async ngOnInit() {
    this.loadDataAsync();
    console.log('Init State');

    const trips = await this.tripService.getTrip();
    this.countries = Array.from(new Set(trips.map((t) => t.country)));
  }

  async loadDataAsync() {
    this.trips = await this.tripService.getTrip();
  }

  async callApi() {
    this.loading = true; // เริ่ม loading
    try {
      this.trips = await this.tripService.getTrip();
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false; // ปิด loading
    }

    // this.trips = await this.tripService.getTrip();

    console.log(this.trips);
    console.log(this.trips[0].name);

    console.log('Call Completed');
  }

  async findOne(input: HTMLInputElement) {
    this.trips = [
      (await this.tripService.getTripByID(+input.value)) as TripGetResponse,
    ];

    console.log(this.trips);
    console.log(this.trips[0].name);
    console.log('Call Completed');
  }

  async findName(input: HTMLInputElement) {
    console.log(input.value);

    const trips = await this.tripService.getTripByName(input.value);

    this.trips = trips.filter((trip) =>
      trip.name.toLowerCase().includes(input.value.toLowerCase())
    );
    console.log(this.trips);
    if (this.trips.length > 0) {
      console.log(this.trips[0].name);
    }
    console.log('Call Completed');
  }

  async filterByCountry(selectedCountry: string) {
    this.trips = await this.tripService.getTripByCountry(selectedCountry);
  }

  async deleteTrip(id: number) {
    if (!confirm('คุณต้องการลบใช่หรือไม่?')) return;

    try {
      const res = await this.tripService.deleteTrip(id);
      console.log(res);

      // อัปเดตรายการ trips ในจอ
      this.trips = this.trips.filter((t) => t.idx !== id);

      alert('ลบสำเร็จ');
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาดในการลบ');
    }
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;

    // ตั้ง fallback box
    imgElement.src = ''; // ลบ src เดิมเพื่อหยุดโหลด
    imgElement.alt = 'ไม่สามารถโหลดรูปได้';

    // ใช้ style ให้เป็นกล่องพร้อม border สีและพื้นหลัง
    imgElement.style.width = '100%';
    imgElement.style.height = '200px';
    imgElement.style.border = '2px solid #ccc';
    imgElement.style.borderRadius = '8px';
    imgElement.style.backgroundColor = '#f0f0f0';
    imgElement.style.display = 'flex';
    imgElement.style.justifyContent = 'center';
    imgElement.style.alignItems = 'center';
    imgElement.style.fontWeight = 'bold';
    imgElement.style.color = '#333';

    // แสดงข้อความเมื่อ hover
    imgElement.title = 'ไม่สามารถโหลดรูปได้';
  }
}
