import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
import { FunService } from './fun.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  constructor(private apiService: ApiService, private fun: FunService) {}
  request(formData: any, url: string) {
    const req = this.apiService.http.post<any[]>(
      this.apiService.apiUrl + url,
      formData
    );
    return req;
  }
    errorMessage(err: any): string {
    if (err.status === 400) {
      return err.error.message.ar;
    } else {
      return 'UN Error';
    }
  }
}
