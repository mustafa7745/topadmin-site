import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LoginService } from './login.service';
import { Group } from './groups.service';
import { Permission } from './permissions.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGroupsService {
  permissionsGroups: PermissionGroup[] = [];
  fm: any;
  id:any
  constructor(
    private apiService: ApiService,
    private globalService: GlobalService

  ) {
    // this.fm = new FormData();
    const m = this.globalService.getFormData();
    this.fm = m
  }
  read(): Observable<PermissionGroup[]> {
    this.resetFormData()
    const data = {
      "TAG": "READ",
      "READ_BY":"GROUP_ID",
      "ID":this.id,
      "FROM": "0"
  }
    this.fm.append("data",JSON.stringify(data))
    return this.apiService.http.post<PermissionGroup[]>(
      this.apiService.apiUrl + 'user/permissions_groups/read.php',
      this.fm
    );
  }
  readMore(): Observable<PermissionGroup[]> {
    this.resetFormData()
    const data = {
      "TAG": "READ",
      "READ_BY":"GROUP_ID",
      "ID":this.id,
      "FROM": this.permissionsGroups.length
  }
    this.fm.append("data",JSON.stringify(data))
    return this.apiService.http.post<PermissionGroup[]>(
      this.apiService.apiUrl + 'user/permissions_groups/read.php',
      this.fm
    );
  }
  delete(ids:any): Observable<any> {
    this.resetFormData()
    this.fm.append("ids",ids)
    return this.apiService.http.post(
      this.apiService.apiUrl + 'user/permissions_groups/delete.php',
      this.fm
    );
  }
  resetFormData(){
    this.fm.delete("id")
    this.fm.delete("ids")
    this.fm.delete("permission_id")
    this.fm.delete("group_id")
    this.fm.delete("search")
  }
  add(permission_id:any,group_id:any): Observable<any> {
   this.resetFormData()
    this.fm.append("permission_id",permission_id)
    this.fm.append("group_id",group_id)
    console.log(group_id);
    console.log(permission_id);
    
    return this.apiService.http.post(
      this.apiService.apiUrl + 'user/permissions_groups/add.php',
      this.fm
    );
  }
}
export interface PermissionGroup {
  permission_group_id:string;
  permission: Permission;
  group:      Group;
}