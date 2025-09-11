import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-upload',
  imports: [
    CommonModule, 
    MatInputModule, 
    MatButtonModule, 
    FormsModule, 
    HttpClientModule
  ],
  templateUrl: './upload.html',
  styleUrl: './upload.scss'
})
export class Upload {
  file?: File;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    if ((event.target as HTMLInputElement).files){
      this.file = (event.target as HTMLInputElement).files![0];
      console.log(this.file);      
    }
  }

  async upload() {
    if (this.file) {
      console.log('Uploading');
      const url = 'http://192.168.1.14:3000/upload';
      const formData = new FormData();
      formData.append('file', this.file);

      const response = await lastValueFrom(
        this.http.post(url, formData)
      );
      console.log(response);
    }
  }
}
