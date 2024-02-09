import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { App } from './apps.service';
import { LoginService } from './login.service';
import { FunService } from '../fun.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  // urls
  urlRead = 'user/permissions/read.php';
  urlAdd = 'user/permissions/add.php';
  urlDelete = 'user/permissions/delete.php';
  // list
  permissions: Permission[] = [];
  selectedItems: string[] = [];
  // search
  isSearchMode = false;
  searchValue = '';
  //
  loadingRead = false;
  loadingReadMore = false;
  loadingSearch = false;
  //
  readError = '';
  readMoreError = '';
  searchError = '';
  addError = '';
  //
  isHaveReadMore = false
  // 
  statusRead = false;
  statusReadMore = false;

  isDisabledSearchButton() {
    return !(this.searchValue.length > 0);
  }
  changeSearchMode(event: any) {
    this.isSearchMode = event.target.checked;
    if (event.target.checked) {
      this.searchValue = '';
    }
  }
  //
  id: any;

  constructor(
    private loginService: LoginService,
    private globalService: GlobalService
  ) {}

  read() {
    this.readError = ''
    this.loadingRead = true;
    const data = JSON.stringify({ TAG: 'READ', FROM: '0' });
    var formData = this.loginService.getFormData();
    formData.set('data', data);
    //
    this.globalService.request(formData, this.urlRead).subscribe({
      next: (response) => {
        this.permissions = response;
        this.loadingRead = false;
        this.statusRead = true;
        if (response.length == 3) {
          this.isHaveReadMore = true;
        } else {
          this.isHaveReadMore = false;
        }
        this.loadingReadMore = false;
      },
      error: (err) => {
        this.readError = this.globalService.errorMessage(err);
        this.loadingRead = false;
        this.statusRead = false;
      },
    });
  }
  readMore() {
    this.readMoreError = ''
    this.loadingReadMore = true;
    // 
    const data = JSON.stringify({ TAG: 'READ', FROM: this.permissions.length });
    var formData = this.loginService.getFormData();
    formData.set('data', data);
    //
    this.globalService.request(formData, this.urlRead).subscribe({
      next: (response) => {
        this.permissions = this.permissions.concat(response);
        this.loadingReadMore = false;
        this.statusReadMore = true;
        if (response.length == 3) {
          this.isHaveReadMore = true;
        } else {
          this.isHaveReadMore = false;
        }
        this.loadingReadMore = false;
      },
      error: (err) => {
        this.readMoreError = this.globalService.errorMessage(err);
        this.loadingReadMore = false;
        this.statusReadMore = false;
      },
    });
  }

  selectItem(id: string) {
    const index = this.selectedItems.findIndex((el) => el === id);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else this.selectedItems.push(id);
  }
  onSelectAll(event: any) {
    if (event.target.checked) {
      this.selectedItems = [];
      this.permissions.forEach((e) => {
        this.selectedItems.push(e.permission_id);
      });
    } else {
      this.selectedItems = [];
    }
  }

  // sendRequest(data: any, url: string, isLoadMore: Boolean = false){
  //   //
  //   // const data = {
  //   //   TAG: 'READ',
  //   //   FROM: '0',
  //   // };
  //   if (
  //     data['TAG'] === 'READ' ||
  //     data['TAG'] === 'SEARCH' ||
  //     data['TAG'] === 'ADD' ||
  //     data['TAG'] === 'DELETE'
  //   ) {
  //     this.loginService.getFormData().set('data', JSON.stringify(data));
  //     this.request(this.loginService.getFormData(), this.urlRead).subscribe({
  //       next: (response) => {
  //         if (isLoadMore) {
  //           if (data['TAG'] === 'READ') {
  //             this.permissions = this.permissions.concat(response);
  //           } else if (data['TAG'] === 'SEARCH') {
  //             this.permissions = this.permissions.concat(response);
  //           }
  //         } else {
  //           if (data['TAG'] === 'READ') {
  //             this.permissions = response;
  //           } else if (data['TAG'] === 'SEARCH') {
  //             this.permissions = response;
  //           }
  //         }
  //       },
  //       error: (err) => {
  //         this.readError = this.errorMessage(err);
  //       },
  //       complete: () => {},
  //     });
  //   }
  //   else
  //   return this.funService.UNKOWN_TAG()
  // }
  // errorMessage(err: any): string {
  //   if (err.status === 400) {
  //     return err.error.message.ar;
  //   } else {
  //     return 'UN Error';
  //   }
  // }
  // add(name: string): Observable<Permission[]> {
  //   const s = JSON.stringify({
  //     TAG: 'ADD',
  //     PERMISSION_NAME: name,
  //   });
  //   this.formData.append('data', s);
  //   return this.apiService.http.post<Permission[]>(
  //     this.apiService.apiUrl + 'user/permissions/add.php',
  //     this.formData
  //   );
  // }
  // searchNative(search: string): Observable<Permission[]> {
  //   const data = JSON.stringify({
  //     TAG: 'SEARCH',
  //     SEARCH_BY: 'NAME',
  //     SEARCH: search,
  //     FROM: '0',
  //   });
  //   const url = 'user/permissions/read.php';
  //   this.request(
  //     data,
  //     url,
  //     () => {
  //       n: (re) => {};
  //     },
  //     () => {}
  //   );
  // }
  // readMore(): Observable<Permission[]> {
  //   const s = JSON.stringify({
  //     TAG: 'READ',
  //     FROM: this.permissions.length,
  //   });
  //   this.formData.append('data', s);
  //   return this.apiService.http.post<Permission[]>(
  //     this.apiService.apiUrl + 'user/permissions/read.php',
  //     this.formData
  //   );
  // }
  // search(search: any, group_id: any): Observable<Permission[]> {
  //   const s = JSON.stringify({
  //     TAG: 'SEARCH',
  //     SEARCH_BY: 'NAME',
  //     SEARCH: search,
  //     CAUSE: 'ADD_TO_PG',
  //     G_ID: group_id,
  //     FROM: '0',
  //   });

  //   this.formData.append('data', s);
  //   console.log(s);
  //   console.log(this.formData);
  //   return this.apiService.http.post<Permission[]>(
  //     this.apiService.apiUrl + 'user/permissions/read.php',
  //     this.formData
  //   );
  // }
  // addIdFormData() {
  //   // console.log(this.formData);
  //   this.formData.append('id', this.id);

  //   console.log(this.formData.get('user_phone'));
  //   console.log(this.formData.get('id'));
  // }
  // deleteId() {
  //   this.formData.delete('id');
  //   this.id = undefined;
  // }
}
export interface Permission {
  permission_id: string;
  permission_name: string;
  permission_created_at: Date;
  permission_updated_at: Date;
}
