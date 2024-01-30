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
  checkUser(url: string, phone: string, password: string): Observable<any> {
    this.apiService.formData.append('user_phone', phone);
    this.apiService.formData.append('user_password', password);
    //
    return this.http.post(
      this.apiService.apiUrl + url,
      this.apiService.formData
    );
  }
}
