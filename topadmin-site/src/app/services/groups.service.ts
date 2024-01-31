import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    private apiService:ApiService,
    private loginService:LoginService
  ) { }

  read(): Observable<Group[]> {
    return this.apiService.http.post<Group[]>(this.apiService.apiUrl+'user/groups/read.php',this.loginService.getFormData())
  }
}

export interface Group {
  group_id: string;
  group_name: string;
  group_created_at:Date,
  group_updated_at:Date
}
