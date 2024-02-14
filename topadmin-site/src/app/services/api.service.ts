import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { info } from 'console';
import { Group } from './groups.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  formData: any;
  apiUrl = "http://localhost/onemegasoft1/api/"
  constructor(@Inject(PLATFORM_ID) private _platformId: Object,
  public http:HttpClient
  ) {
    var did: any;
    if (isPlatformBrowser(this._platformId)) {
      did = this.initDeviceId();
      const info = { name: 'edge' };
    this.formData = new FormData();
  //  this.formData = 
    //
    const data1 = {
      app_package_name: 'com.onemegasoft.topadminweb',
      sha:'sha2',
      'app_version': '1',
      'device_id': did,
      'device_info':info,
      'app_device_token': 'browserToken',
      'device_type_name': 'browser'
    }
    // if (did != undefined) {
      this.formData.append('data1', JSON.stringify(data1));
    
    } 
    
    // }
  
//     if (isPlatformServer(this._platformId)) {
// console.log("mustafa Esmail");

//     }
    // this.formData.append(
    //   'sha',
    //   'sha1'
    // );
    // this.formData.append('app_version', '1');
    // this.formData.append('device_id', did);
    // this.formData.append('device_info', JSON.stringify(info));
    // this.formData.append('app_device_token', 'browserToken');
    // this.formData.append('device_type_name', 'browser');
  }
  initDeviceId(): string {
    const device_id = 'did';
    if (!localStorage.getItem(device_id)) {
      const id = this.getUniqueId(4);
      localStorage.setItem(device_id, id);

      return id;
    } else {
      return localStorage.getItem(device_id)!;
    }
  }

  sendHttpPost(url:string,data:any){
    return this.http.post<Group[]>(
      this.apiUrl + url,
      data
    );
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
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');

  }



}
