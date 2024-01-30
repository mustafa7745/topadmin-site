import { Component, PLATFORM_ID, Inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'topadmin-site';
  responseCode: any;
  data: any;
  isLoading = true;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private http: HttpClient
  ) {}
  initDeviceId():string {
    const device_id = 'did';
      if (!localStorage.getItem(device_id)) {
        const id = getUniqueId(4);
        localStorage.setItem(device_id, id);
       
        return id;
      } else {
        return localStorage.getItem(device_id)!;
      }
  }

  ngOnInit() {
    var did: any;
    if (isPlatformBrowser(this._platformId)) {
      did = this.initDeviceId();
    }
    const info = { name: 'edge' };
    var formData = new FormData();
    formData.append('app_package_name', 'com.onemegasoft.topadminweb');
    formData.append(
      'sha',
      '85:9D:B5:3A:2F:E9:87:B8:0C:74:35:3B:B6:4A:6C:F4:1B:26:66:BA:27:EF:97:87:B1:E2:A3:BA:45:25:86:97'
    );
    formData.append('app_version', '1');
    formData.append('device_id', did);
    formData.append('device_info', JSON.stringify(info));
    formData.append('app_device_token', 'browserToken');
    formData.append('device_type_name', 'browser');
    this.http
      // .post('http://localhost/onemegasoft1/test.php',formData)
      .post('http://localhost/onemegasoft1/api/user/init.php', formData)
      .subscribe(
        (data) => {
          this.responseCode = 200;
          this.data = "You can go next step";
          this.isLoading = false
        },
        (e) => {
          this.responseCode = e.status;
          if (e.status === 400) {
            this.data = e.error.message.ar;
          }
          else{
            this.data = "UN Error";
          }
          this.isLoading = false
        }
        
      );
  }
}
/**
 * generate groups of 4 random characters
 * @example getUniqueId(1) : 607f
 * @example getUniqueId(2) : 95ca-361a
 * @example getUniqueId(4) : 6a22-a5e6-3489-896b
 */
export function getUniqueId(parts: number): string {
  const stringArr = [];
  for (let i = 0; i < parts; i++) {
    // tslint:disable-next-line:no-bitwise
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');

}
