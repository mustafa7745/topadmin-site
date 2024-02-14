import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
import { FunService } from './fun.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  constructor(public apiService: ApiService, private fun: FunService,
    @Inject(PLATFORM_ID) private _platformId: Object) {}
  request(formData: any, url: string) {
    
    const req = this.apiService.http.post<any[]>(
      this.apiService.apiUrl + url,
      formData
    );
    return req;
  }
    errorMessage(err: any): string {
      // console.log(err);
      
    if (err.status === 400) {
      return err.error.message.ar;
    } 
    if (err.status === 404) {
      return "Request not found";
    } 
    else {
      return 'UN Error';
    }
  }
}
