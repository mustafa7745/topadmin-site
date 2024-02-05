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
  permissionsGroups: PermissionGroup[] = [];
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
  delete(ids:any): Observable<any> {
    this.formData.delete("id");
    this.formData.append("ids",ids)
    return this.apiService.http.post(
      this.apiService.apiUrl + 'user/permissions_groups/delete.php',
      this.formData
    );
  }
}
export interface PermissionGroup {
  permission_group_id:string;
  permission: Permission;
  group:      Group;
}