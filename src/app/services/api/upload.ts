import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Constants } from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class Upload {
  constructor(private constants: Constants, private http: HttpClient) {}

  public async uploadFile(file: File) {
    const url = this.constants.API_ENDPOINT + '/upload';
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await lastValueFrom(
      this.http.post(url, formData)
    );

    return await lastValueFrom(this.http.post(url, formData));
  }
}
