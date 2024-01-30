import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { info } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  formData: any;
  apiUrl = "http://localhost/onemegasoft1/api/"
  constructor(@Inject(PLATFORM_ID) private _platformId: Object,) {
    var did: any;
    if (isPlatformBrowser(this._platformId)) {
      did = this.initDeviceId();
    }
    const info = { name: 'edge' };
    this.formData = new FormData();
    this.formData.append('app_package_name', 'com.onemegasoft.topadminweb');
    this.formData.append(
      'sha',
      '85:9D:B5:3A:2F:E9:87:B8:0C:74:35:3B:B6:4A:6C:F4:1B:26:66:BA:27:EF:97:87:B1:E2:A3:BA:45:25:86:97'
    );
    this.formData.append('app_version', '1');
    this.formData.append('device_id', did);
    this.formData.append('device_info', JSON.stringify(info));
    this.formData.append('app_device_token', 'browserToken');
    this.formData.append('device_type_name', 'browser');
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
