import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  urlLogin = 'user/login.php';
  constructor(private globalService: GlobalService) {}
  setLogin(phone: string, password: string) {
    const data = { phone: phone, password: password };
    localStorage.setItem(this.globalService.loginLocalstorage, JSON.stringify(data));
  }

 
}
