import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TripGetResponse } from '../../model/trip_get_res';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../services/api/trip';

@Component({
  selector: 'app-update',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    MatCardModule,
  ],
  templateUrl: './update.html',
  styleUrls: ['./update.scss'],
})
export class Update {
  tripId: number = 0;

  name: string = '';
  country: string = '';
  destinationid: number | null = null;
  coverimage: string = '';
  detail: string = '';
  price: number = 0;
  duration: number = 0;

  destination = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  countries = [
    { name: 'สวิตเซอร์แลนด์' }, 
    { name: 'สิงคโปร์' }, 
    { name: 'เวียดนาม' }, 
    { name: 'ลาว' }, 
    { name: 'ไอซ์แลนด์' }, 
    { name: 'เยอรมันนี' }, 
    { name: 'ญี่ปุ่น' }, 
    { name: 'มัลดีฟส์' }, 
    { name: 'อินเดีย' }, 
    { name: 'มาเลเซีย' }, 
    { name: 'ฝรั่งเศส' }, 
    { name: 'เกาหลี' }, 
    { name: 'ประเทศไทย' }, 
    { name: 'จีน' }, 
  ];

  constructor(private tripService: Trip,private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    this.tripId = +this.route.snapshot.paramMap.get('id')!;
    await this.loadTrip();
  }

  async loadTrip() {
    try {
      const trip = await this.tripService.getTripByID(this.tripId);
      if (trip) {
        this.name = trip.name;
        this.country = trip.country;
        this.coverimage = trip.coverimage;
        this.detail = trip.detail;
        this.price = trip.price;
        this.duration = trip.duration;

        const did = this.destination.find(d => d.name === trip.destination_zone);
        this.destinationid = did ? did.value : null
      }
    } catch (err) {
      console.error(err);
      alert('โหลดข้อมูลไม่สำเร็จ');
    }
  }

  async saveTrip() {
    const body = {
      name: this.name,
      country: this.country,
      destinationid: this.destinationid,
      coverimage: this.coverimage,
      detail: this.detail,
      price: this.price,
      duration: this.duration
    };

    try {
      await this.tripService.updateTrip(this.tripId, body);
      alert('แก้ไขข้อมูลสำเร็จ');
      this.router.navigate(['/']); // กลับหน้า list
    } catch (err) {
      console.error(err);
      alert('แก้ไขไม่สำเร็จ');
    }
  }

  async cancel() {
    this.router.navigate(['/']);
  }
}
