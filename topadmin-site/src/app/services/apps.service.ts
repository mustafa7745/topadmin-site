import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AppsService {

  id:any
  formData : FormData = new FormData()

  constructor(
    private apiService:ApiService,
    private loginService:LoginService
  ) { 
    this.formData = new FormData();
    this.formData = this.loginService.getFormData()
  }

  read(): Observable<App[]> {
   
    return this.apiService.http.post<App[]>(this.apiService.apiUrl+'user/apps/read.php',this.formData)
  }
  addIdFormData(id:string){
    // console.log(this.formData);
   
    this.formData.append("id",'{"type":"group","id":"1"}')
    console.log(this.formData.get("user_phone"));
    console.log(this.formData.get("id"));
  }
}
export interface App {
  app_id:           string;
  app_name:         string;
  app_package_name: string;
  app_sha256:       string;
  app_icon:         string;
  app_version:      string;
  device_type_id:   string;
  user_id:          string;
  group_id:         string;
  app_created_at:   Date;
  app_updated_at:   Date;
}

