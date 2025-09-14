import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Trip } from '../../services/api/trip';

@Component({
  selector: 'app-add',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    MatCardModule,
  ],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add {
  name: string = '';
  destinationid: number = 0;
  country: string = '';
  coverimage: string = '';
  detail: string = '';
  price: number = 0;
  duration: number = 0;

  destinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  countries: Country[] = [
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

  constructor(private http: HttpClient, private tripService: Trip, private router: Router) {}

  async addNew() {
    const body = {
      name: this.name,
      destinationid: this.destinationid,
      country: this.country,
      coverimage: this.coverimage,
      detail: this.detail,
      price: this.price,
      duration: this.duration
    };

    // const url = 'http://10.34.10.104:3000/trip';

    try {
      const response = await this.tripService.addNewTrip(body);
      alert('เพิ่มข้อมูลสำเร็จ');
      console.log(response);
      this.router.navigate(['/']);
    } catch (error) {
      alert('เพิ่มข้อมูลไม่สำเร็จ');
      console.error('POST failed: ', error);
    }
  }
}

interface Destination {
  value: number;
  name: string;
}

interface Country {
  name: string;
}
