import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { lastValueFrom } from 'rxjs';
import { Trip } from '../../services/api/trip';

@Component({
  selector: 'app-postput',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,  
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    MatCardModule,
  ],
  templateUrl: './postput.html',
  styleUrl: './postput.scss',
})
export class Postput {
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

  constructor(private http: HttpClient, private tripService: Trip) {}

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
      console.log(response);
    } catch (error) {
      console.error('POST failed: ', error);
    }
  }
}

interface Destination {
  value: number;
  name: string;
}