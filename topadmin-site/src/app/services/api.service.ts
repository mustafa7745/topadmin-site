import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { info } from 'console';
import { Group } from './groups.service';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  formData: any;
  apiUrl = 'http://localhost/onemegasoft1/api/';
  constructor(
    private router:Router,
    @Inject(PLATFORM_ID) private _platformId: Object,
    public http: HttpClient
  ) {
    
    if (isPlatformBrowser(this._platformId)) {
     this.init()
    }
  }
  init(){
    var did: any;
    did = this.initDeviceId();
    const info = { name: 'edge' };
    this.formData = new FormData();
    const data1 = {
      app_package_name: 'com.onemegasoft.topadminweb',
      sha: 'sha2',
      app_version: '1',
      device_id: did,
      device_info: info,
      app_device_token: 'browserToken',
      device_type_name: 'browser',
    };
    this.formData.append('data1', JSON.stringify(data1));
  }
  initDeviceId(): string {
    const device_id = 'did';
    if (!localStorage.getItem(device_id)) {
      const id = this.getUniqueId(1);
      localStorage.setItem(device_id, id);
      return id;
    } else {
      return localStorage.getItem(device_id)!;
    }
  }


  /**
   * generate groups of 4 random characters
   * @example getUniqueId(1) : 607f
   * @example getUniqueId(2) : 95ca-361a
   * @example getUniqueId(4) : 6a22-a5e6-3489-896b
   */
  getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1);
      stringArr.push(S4);
    }
    // stringArr.join('-')
    return stringArr.join('-')+"a"+(new Date()).getTime().toString();
  }
}
