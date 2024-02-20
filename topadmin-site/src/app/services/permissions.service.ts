import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { LoginService } from './login.service';
import { GlobalService } from '../global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddPermission } from '../permissions/add-permissions.component';
import { ModalUpdatePermissionName } from '../permissions/update-permissions.component';
import { GlobalStringService } from '../global-string.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private globalService: GlobalService,
    private globalString: GlobalStringService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
  }
 
  modalService = inject(NgbModal);
  // urls
  urlRead = 'user/permissions/read.php';
  urlAdd = 'user/permissions/add.php';
  urlDelete = 'user/permissions/delete.php';
  urlUpdate = 'user/permissions/update.php';
  // list
  list: Permission[] = [];
  selectedItems: string[] = [];
  // search
  //
  loadingRead = false;
  loadingReadMore = false;
  loadingSearch = false;
  loadingSearchMore = false;
  //
  readError = '';
  readMoreError = '';
  searchMoreError = '';
  searchError = '';
  //
  isHaveReadMore = false;
  isHaveSearchMore = false;
  //
  statusRead = false;
  statusReadMore = false;
  //
  searchMode = false;
  searchText = '';
  emptySearchData = '';

  reset() {
    this.list = [];
    this.selectedItems = [];
    //
    this.loadingRead = false;
    this.loadingReadMore = false;
    this.loadingSearch = false;
    this.loadingSearchMore = false;
    //
    this.readError = '';
    this.readMoreError = '';
    this.searchMoreError = '';
    this.searchError = '';
    //
    this.isHaveReadMore = false;
    this.isHaveSearchMore = false;
    //
    this.statusRead = false;
    this.statusReadMore = false;
    //
    this.searchMode = false;
    this.searchText = '';
  }

  isDisabledSearchButton() {
    return !(this.searchText.length > 0);
  }
  changeSearchMode(event: any) {
    this.list = [];
    this.isHaveSearchMore = false;
    this.searchMode = event.target.checked;
    if (event.target.checked) {
      this.searchText = '';
      this.list = [];
    } else {
      this.read();
    }
  }
  //
  search() {
    this.list = [];
    this.emptySearchData = '';
    this.searchError = '';
    this.loadingSearch = true;
    this.isHaveSearchMore = false;
    const data = JSON.stringify({
      tag: 'search',
      searchBy: 'name',
      search: this.searchText,
      from: '0',
    });
    var formData = this.globalService.getFormData();
    formData.append('data3', data);
    //
    this.globalService.request<Permission>(formData, this.urlRead).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.emptySearchData = 'No Data Found';
        } else {
          this.list = response;

          if (response.length == 3) {
            this.isHaveSearchMore = true;
          } else {
            this.isHaveSearchMore = false;
          }
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
    this.searchMoreError = '';
    this.loadingSearchMore = true;
    const data = JSON.stringify({
      tag: 'search',
      searchBy: 'name',
      search: this.searchText,
      from: this.list.length,
    });
    var formData = this.globalService.getFormData();
    formData.set('data3', data);
    //
    this.globalService.request<Permission>(formData, this.urlRead).subscribe({
      next: (response) => {
        this.list = this.list.concat(response);
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
  //
  read() {
    this.readError = '';
    this.loadingRead = true;
    const data = JSON.stringify({ tag: 'read', from: '0' });
    var formData = this.globalService.getFormData();
    formData.set('data3', data);
    //
    this.globalService.request<Permission>(formData, this.urlRead).subscribe({
      next: (response) => {
        this.list = response;
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
    this.readMoreError = '';
    this.loadingReadMore = true;
    //
    const data = JSON.stringify({ tag: 'read', from: this.list.length });
    var formData = this.globalService.getFormData();
    formData.set('data3', data);
    //
    this.globalService.request<Permission>(formData, this.urlRead).subscribe({
      next: (response) => {
        this.list = this.list.concat(response);
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
  //
  selectItem(id: string) {
    console.log(this.selectedItems.length);
    
    const index = this.selectedItems.findIndex((el) => el === id);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else this.selectedItems.push(id);
  }
  onSelectAll(event: any) {
    if (event.target.checked) {
      this.selectedItems = [];
      this.list.forEach((e) => {
        this.selectedItems.push(e.permission_id);
      });
    } else {
      this.selectedItems = [];
    }
  }
  //
  add(name: string, modal: any) {
    const data = JSON.stringify({ tag: 'add', name: name });
    var formData = this.globalService.getFormData();
    formData.set('data3', data);
    //
    const loadingModal = this.globalService.loadingModal();
    //
    this.globalService.request(formData, this.urlAdd).subscribe({
      next: (response) => {
        loadingModal.close();
        this.globalService.successModal().componentInstance.result =
          this.globalString.getSuccessAdd();
        //
        let x: Permission = response as unknown as Permission;
        this.list.unshift(x);
        modal.close();
      },
      error: (err) => {
        this.globalService.errorModal().componentInstance.result =
          this.globalService.errorMessage(err);
        loadingModal.close();
      },
    });
  }
  //
  updateName(name: string, id: string, modal: any) {
    const data = JSON.stringify({ tag: 'update', name: name, id: id });
    var formData = this.globalService.getFormData();
    formData.set('data3', data);
    //
    const loadingModal = this.globalService.loadingModal();
    //
    this.globalService.request(formData, this.urlUpdate).subscribe({
      next: (response) => {
        loadingModal.close();
        this.globalService.successModal().componentInstance.result =
          this.globalString.getSuccessUpdate();
        modal.close();
        // 

        //Start Update item in list
        const index = this.list.findIndex(
          (obj) => obj.permission_id === id
        );
        if (index > -1) {
          this.list[index].permission_name = name;
        }
        //End Update item in list
      },
      error: (err) => {
        this.globalService.errorModal().componentInstance.result =
          this.globalService.errorMessage(err);
        loadingModal.close();
      },
    });
  }
  //
  deletecConfirm() {
    const a = this.globalService.confirmModal()
    a.componentInstance.title = this.globalString.getConfirmDeleteQuestion(this.selectedItems.length)
      
    a.result
      .then((r) => {
        this.delete();
        a.close();
      })
      .catch((e) => {
       this.selectedItems = []
      });
  }
  delete() {
    var ids = this.globalService.ids(this.selectedItems);
    // 
    const data = JSON.stringify({ tag: 'delete', ids: ids });
    var formData = this.globalService.getFormData();
    formData.set('data3', data);
    //
    const loadingModal = this.globalService.loadingModal();
    loadingModal.componentInstance.title = this.globalString.getDeleting();
    // 
    this.globalService.request(formData, this.urlDelete).subscribe({
      next: (response) => {
        loadingModal.close();
        this.globalService.successModal().componentInstance.result =
        this.globalString.getSuccessDelete();
        // remove item from list
        this.selectedItems.forEach((element) => {
          const index = this.list.findIndex(
            (obj) => obj.permission_id === element
          );
          if (index > -1) {
            this.list.splice(index, 1);
          }
        });
        this.selectedItems = [];
      },
      error: (err) => {
        this.globalService.errorModal().componentInstance.result =
        this.globalService.errorMessage(err);
      loadingModal.close();
      },
    });
  }
  //
  openAddModal() {
    const a = this.modalService.open(ModalAddPermission, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
  }
  openUpdateNameModal(id: string, name: string) {
    const a = this.modalService.open(ModalUpdatePermissionName, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
    a.componentInstance.id = id;
    a.componentInstance.preName = name;
    a.componentInstance.newName = name;
  }
}
export interface Permission {
  permission_id: string;
  permission_name: string;
  permission_created_at: Date;
  permission_updated_at: Date;
}
