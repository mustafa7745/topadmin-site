import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { App } from './apps.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  id:any

  formData : FormData = new FormData()

  constructor(
    private apiService:ApiService,
    private loginService:LoginService
  ) { 
    this.formData = new FormData();
    this.formData = this.loginService.getFormData()
  }

  resetFormData(){
    this.formData.delete("id")
    this.formData.delete("ids")
    this.formData.delete("permission_id")
    this.formData.delete("group_id")
    this.formData.delete("search")
  }

  read(): Observable<Permission[]> {
    this.resetFormData()
    return this.apiService.http.post<Permission[]>(this.apiService.apiUrl+'user/permissions/read.php',this.formData)
  }
  search(search:any,group_id:any): Observable<Permission[]> {
    this.resetFormData()
    const s = JSON.stringify({
      "TAG": "SEARCH",
      "SEARCH_BY":"NAME",
      "SEARCH":search,
      "CAUSE":"ADD_TO_PG",
      "G_ID":group_id,
      "FROM": "0"
  })
    
    this.formData.append("data",s)
    console.log(s);
    console.log(this.formData);
    return this.apiService.http.post<Permission[]>(this.apiService.apiUrl+'user/permissions/read.php',this.formData)
  }
  addIdFormData(){
    // console.log(this.formData);
    this.formData.append("id",this.id);
   
    console.log(this.formData.get("user_phone"));
    console.log(this.formData.get("id"));
  }
  deleteId(){
    this.formData.delete("id")
    this.id = undefined
  }
}
export interface Permission {
  permission_id: string;
  permission_name: string;
  permission_created_at: Date;
  permission_updated_at: Date;
}
