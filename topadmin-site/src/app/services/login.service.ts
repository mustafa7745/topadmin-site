import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginLocalstorage = 'islogin';
  phone: string = '';
  password: string = '';

  getPhone(): string {
    if (isPlatformBrowser(this._platformId)) {
      var data = localStorage.getItem(this.loginLocalstorage);

      return JSON.parse(data!).phone;
    }
    return '';
  }

  getPassword(): string {
    if (isPlatformBrowser(this._platformId)) {
      var data = localStorage.getItem(this.loginLocalstorage);

      return JSON.parse(data!).password;
    }
    return '';
  }
  getFormData():any{
    // this.apiService.formData.append('user_phone', this.getPhone());
    // this.apiService.formData.append('user_password', this.getPassword());
    // this.apiService.formData.append('data', '{}');
    if (isPlatformBrowser(this._platformId)){
      const data2 = {'user_phone': this.getPhone(),'user_password': this.getPassword()}
    this.apiService.formData.append('data2', JSON.stringify(data2));
    return this.apiService.formData;
    }
    
  }
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  removeUser() {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.removeItem(this.loginLocalstorage);
    }
  }

  isLogin(): boolean {
    if (isPlatformBrowser(this._platformId)) {
      if (!localStorage.getItem(this.loginLocalstorage)) {
        return false;
      }
      return true;
    }
    return false;
  }
  setLogin(phone: string, password: string) {
    if (isPlatformBrowser(this._platformId)) {
      const data = { phone: phone, password: password };
      localStorage.setItem(this.loginLocalstorage, JSON.stringify(data));
    }
  }
  checkUser( phone: string, password: string): Observable<any> {
    const data2 = {'user_phone': phone,'user_password': password}
    this.apiService.formData.append('data2', JSON.stringify(data2));
    // this.apiService.formData.append('user_password', password);
    // this.apiService.formData.append('data', '{}');
    //
    return this.apiService.sendHttpPost('user/login.php',this.apiService.formData);
  }
}
