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

  read(): Observable<Permission[]> {
    return this.apiService.http.post<Permission[]>(this.apiService.apiUrl+'user/permissions/read.php',this.formData)
  }
  search(search:any): Observable<Permission[]> {
    const s = JSON.stringify({"searchBy":"name","search":search})
    this.formData.delete("id")
    
    this.formData.append("search",s)
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
