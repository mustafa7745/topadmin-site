import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LoginService } from './login.service';
import { Group } from './groups.service';
import { Permission } from './permissions.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGroupsService {

  formData: any;
  id:any
  constructor(
    private apiService: ApiService,
    private loginService: LoginService
  ) {
    this.formData = new FormData();
    this.formData = this.loginService.getFormData();
  }
  read(): Observable<PermissionGroup[]> {
    this.formData.append("id",this.id)
    return this.apiService.http.post<PermissionGroup[]>(
      this.apiService.apiUrl + 'user/permissions_groups/read.php',
      this.formData
    );
  }
}
export interface PermissionGroup {
  permission: Permission;
  group:      Group;
}