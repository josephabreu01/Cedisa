import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResApiService {
  ambiente = {
    desarrollo: 'http://localhost:3030/',
    produccion: 'http://192.168.0.6:3030/',
  };

  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Autorizacion', token) : {};
  }

  get(link: string) {
    return this.http
      .get(this.ambiente.desarrollo + link, { headers: this.getHeaders() })
      .toPromise();
  }

  post(link: string, body: any) {
    return this.http
      .post(this.ambiente.desarrollo + link, body, {
        headers: this.getHeaders(),
      })
      .toPromise();
  }

  delete(link: string) {
    return this.http
      .delete(this.ambiente.desarrollo + link, { headers: this.getHeaders() })
      .toPromise();
  }
}
