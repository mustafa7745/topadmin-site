import { Injectable } from '@angular/core';
import { Group } from './groups.service';
import { App } from './apps.service';
import { ApiService } from './api.service';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class AppsGroupsService {
  formData: any;
  id:any
  constructor(
    private apiService: ApiService,
    private globalService: GlobalService

  ) {
    this.formData = new FormData();
    this.formData = this.globalService.getFormData();
  }
  read(): Observable<AppsGroups[]> {
    this.formData.append("id",this.id)
    return this.apiService.http.post<AppsGroups[]>(
      this.apiService.apiUrl + 'user/apps_groups/read.php',
      this.formData
    );
  }
}
export interface AppsGroups {
  app: App;
  group: Group;
}
