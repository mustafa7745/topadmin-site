import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class AppsService {
  id: any;
  //
  formData: FormData = new FormData();

  constructor(
    private apiService: ApiService,
    private globalService: GlobalService
  ) {
    this.formData = new FormData();
    this.formData = this.globalService.getFormData();
  }

  read(): Observable<App[]> {
    return this.apiService.http.post<App[]>(
      this.apiService.apiUrl + 'user/apps/read.php',
      this.formData
    );
  }
  addIdFormData() {
    // console.log(this.formData);
    this.formData.append('id', this.id);

    console.log(this.formData.get('user_phone'));
    console.log(this.formData.get('id'));
  }
  deleteId() {
    this.formData.delete('id');
    this.id = undefined;
  }
}

export interface App {
  app_id: string;
  app_name: string;
  app_package_name: string;
  app_sha256: string;
  app_icon: string;
  app_version: string;
  device_type: DeviceType;
  user_id: string;
  group_id: string;
  app_created_at: Date;
  app_updated_at: Date;
}
export interface DeviceType {
  device_type_id: string;
  device_type_name: string;
  device_type_created_at: Date;
  device_type_updated_at: Date;
}
