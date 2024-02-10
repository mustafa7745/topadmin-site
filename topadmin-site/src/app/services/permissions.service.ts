import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { App } from './apps.service';
import { LoginService } from './login.service';
import { FunService } from '../fun.service';
import { GlobalService } from '../global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModal } from '../CBootstrap/modal/confirm/confirm-modal.component';
import { LoadingModal } from '../CBootstrap/modal/loading/loading-modal.component';
import { SuccessInfoModal } from '../CBootstrap/modal/success-info/successinfo-modal.component';
import { ErrorInfoModal } from '../CBootstrap/modal/error-info/errorinfo-modal.component';
import { ModalAddPermission } from '../permissions/add-permissions.component';

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
  //
  loadingRead = false;
  loadingReadMore = false;
  loadingSearch = false;
  loadingSearchMore = false
  //
  readError = '';
  readMoreError = '';
  searchMoreError = ''
  searchError = '';
  addError = '';
  deleteError = '';
  //
  isHaveReadMore = false
  isHaveSearchMore = false
  // 
  statusRead = false;
  statusReadMore = false;
  // 
  searchMode = false
  searchText = ''

  isDisabledSearchButton() {
    return !(this.searchText.length > 0);
  }
  changeSearchMode(event: any) {
    this.searchMode = event.target.checked;
    if (event.target.checked) {
      this.searchText = '';
      this.permissions = []
    }
    else {
      this.read()
    }
  }
  //
  id: any;

  constructor(
    private loginService: LoginService,
    private globalService: GlobalService
  ) { }

  search() {
    this.searchError = ''
    this.loadingSearch = true;
    const data = JSON.stringify({
      TAG: 'SEARCH',
      SEARCH_BY: 'NAME',
      SEARCH: this.searchText,
      FROM: "0"
    });
    var formData = this.loginService.getFormData();
    formData.set('data', data);
    //
    this.globalService.request(formData, this.urlRead).subscribe({
      next: (response) => {
        this.permissions = response;
        this.loadingSearch = false;
        // this.statusRead = true;
        if (response.length == 3) {
          this.isHaveSearchMore = true;
        } else {
          this.isHaveSearchMore = false;
        }
        this.loadingSearch = false;
      },
      error: (err) => {
        this.searchError = this.globalService.errorMessage(err);
        this.loadingSearch = false;
      },
    });
  }
  searchMore() {
    this.searchMoreError = ''
    this.loadingSearchMore = true;
    const data = JSON.stringify({
      TAG: 'SEARCH',
      SEARCH_BY: 'NAME',
      SEARCH: this.searchText,
      FROM: this.permissions.length
    });
    var formData = this.loginService.getFormData();
    formData.set('data', data);
    //
    this.globalService.request(formData, this.urlRead).subscribe({
      next: (response) => {
        this.permissions = this.permissions.concat(response);
        this.loadingSearchMore = false;
        if (response.length == 3) {
          this.isHaveSearchMore = true;
        } else {
          this.isHaveSearchMore = false;
        }
        this.loadingSearchMore = false;
      },
      error: (err) => {
        this.searchMoreError = this.globalService.errorMessage(err);
        this.loadingSearchMore = false;
      },
    });

  }

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
  add(name: string,modal:any){
    const data = JSON.stringify({ TAG: 'ADD', PERMISSION_NAME: name, });
    var formData = this.loginService.getFormData();
    formData.set('data', data);
    // 
    const loadingModal = this.modalService.open(LoadingModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
    this.globalService.request(formData, this.urlAdd).subscribe({
      next: (response) => {
        loadingModal.close()
        const successModal = this.modalService.open(SuccessInfoModal, {
          keyboard: false,
          backdrop: 'static',
          centered: true,
        });
        successModal.componentInstance.result = "Add Done"
        modal.close()
      },
      error: (err) => {
        const errorModal = this.modalService.open(ErrorInfoModal, {
          keyboard: false,
          backdrop: 'static',
          centered: true,
        });
        errorModal.componentInstance.result = this.globalService.errorMessage(err);
        loadingModal.close()
       
      
      },
    });
  
  }
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
  modalService = inject(NgbModal);
  deletecConfirm() {
    const a = this.modalService.open(ConfirmModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
    a.componentInstance.title = "Are You Sure to Delete ("+this.selectedItems.length+") Items ?"

    a.result.then(r => {
      this.delete()
      a.close()

    }).catch(e => {
      console.log("mustaaffff");
      console.log(e);
    })

  }
  delete() {
    var emptyJson = '{}';
      var ids = JSON.parse(emptyJson);
      for (let index = 0; index < this.selectedItems.length; index++) {
        ids[index + 1] = this.selectedItems[index].toString();
      }

    const data = JSON.stringify({ TAG: 'DELETE', IDS: ids });
    var formData = this.loginService.getFormData();
    formData.set('data', data);
    // 
    const loadingModal = this.modalService.open(LoadingModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });

    loadingModal.componentInstance.title = "Deleting ... "

    this.globalService.request(formData, this.urlDelete).subscribe({
      next: (response) => {
        loadingModal.close()
        const successModal = this.modalService.open(SuccessInfoModal, {
          keyboard: false,
          backdrop: 'static',
          centered: true,
        });
        successModal.componentInstance.result = "Done DELETED"
        this.selectedItems.forEach((element) => {
          const index = this.permissions.findIndex(
            (obj) => obj.permission_id === element
          );
          if (index > -1) {
            this.permissions.splice(index, 1);
          }
        });
       
      },
      error: (err) => {
        loadingModal.close();
        const errorModal = this.modalService.open(ErrorInfoModal, {
          keyboard: false,
          backdrop: 'static',
          centered: true,
        });
        errorModal.componentInstance.result = this.globalService.errorMessage(err);
      },
    });

  }

  openAddModal(){
    const a = this.modalService.open(ModalAddPermission, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });

  }
}
export interface Permission {
  permission_id: string;
  permission_name: string;
  permission_created_at: Date;
  permission_updated_at: Date;
}
