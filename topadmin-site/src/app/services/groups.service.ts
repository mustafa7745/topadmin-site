import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModal } from '../CBootstrap/modal/confirm/confirm-modal.component';
import { ErrorInfoModal } from '../CBootstrap/modal/error-info/errorinfo-modal.component';
import { LoadingModal } from '../CBootstrap/modal/loading/loading-modal.component';
import { SuccessInfoModal } from '../CBootstrap/modal/success-info/successinfo-modal.component';
import { GlobalService } from '../global.service';
import { ModalAddPermission } from '../permissions/add-permissions.component';
import { ModalUpdatePermissionName } from '../permissions/update-permissions.component';
import { Permission } from './permissions.service';
import { ModalAddGroup } from '../groups/add-group.component';

@Injectable({
  providedIn: 'root'
})
export class GroupsService{
  constructor(
    private loginService: LoginService,
    private globalService: GlobalService
  ) { }
  modalService = inject(NgbModal);
  // urls
  urlRead = 'user/groups/read.php';
  urlAdd = 'user/groups/add.php';
  urlDelete = 'user/groups/delete.php';
  urlUpdate = 'user/groups/edit.php';
  // list
  list: Group[] = [];
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
  //
  isHaveReadMore = false
  isHaveSearchMore = false
  // 
  statusRead = false;
  statusReadMore = false;
  // 
  searchMode = false
  searchText = ''
  emptySearchData = ''

  reset(){
    this.list= []
    this.selectedItems = []
    // 
    this.loadingRead = false
    this.loadingReadMore =false
    this.loadingSearch = false
    this.loadingSearchMore = false
    // 
    this.readError = '';
    this.readMoreError = '';
    this.searchMoreError = ''
    this.searchError = '';
    // 
    this.isHaveReadMore = false
    this.isHaveSearchMore = false
    // 
    this.statusRead = false
    this.statusReadMore = false
    // 
    this.searchMode = false
    this.searchText = ''
  }

  isDisabledSearchButton() {
    return !(this.searchText.length > 0);
  }
  changeSearchMode(event: any) {
    this.list = []
    this.isHaveSearchMore = false
    this.searchMode = event.target.checked;
    if (event.target.checked) {
      this.searchText = '';
      this.list = []
    }
    else {
      this.read()
    }
  }
  //
  search() {
    this.list = []
    this.emptySearchData = ''
    this.searchError = ''
    this.loadingSearch = true;
    this.isHaveSearchMore = false;
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
        if (response.length === 0) {
          this.emptySearchData = "No Data Found"
        }else{
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
    this.searchMoreError = ''
    this.loadingSearchMore = true;
    const data = JSON.stringify({
      TAG: 'SEARCH',
      SEARCH_BY: 'NAME',
      SEARCH: this.searchText,
      FROM: this.list.length
    });
    var formData = this.loginService.getFormData();
    formData.set('data', data);
    //
    this.globalService.request(formData, this.urlRead).subscribe({
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
    this.readError = ''
    this.loadingRead = true;
    const data = JSON.stringify({ TAG: 'READ', FROM: '0' });
    var formData = this.loginService.getFormData();
    formData.set('data', data);
    //
    this.globalService.request(formData, this.urlRead).subscribe({
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
    this.readMoreError = ''
    this.loadingReadMore = true;
    // 
    const data = JSON.stringify({ TAG: 'READ', FROM: this.list.length });
    var formData = this.loginService.getFormData();
    formData.set('data', data);
    //
    this.globalService.request(formData, this.urlRead).subscribe({
      next: (response) => {
        console.log(response);
        console.log(this.list.length);
        
        
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
    const index = this.selectedItems.findIndex((el) => el === id);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else this.selectedItems.push(id);
  }
  onSelectAll(event: any) {
    if (event.target.checked) {
      this.selectedItems = [];
      this.list.forEach((e) => {
        this.selectedItems.push(e.group_id);
      });
    } else {
      this.selectedItems = [];
    }
  }
  // 
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
        modal.close();
        console.log("mustafa");
        
        this.read()
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
  // 
  updateName(name: string,id:string,modal:any){
    const data = JSON.stringify({ TAG: 'EDIT', ID:id, PERMISSION_NAME: name, });
    var formData = this.loginService.getFormData();
    formData.set('data', data);
    // 
    const loadingModal = this.modalService.open(LoadingModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
    this.globalService.request(formData, this.urlUpdate).subscribe({
      next: (response) => {
        loadingModal.close()
        const successModal = this.modalService.open(SuccessInfoModal, {
          keyboard: false,
          backdrop: 'static',
          centered: true,
        });
        successModal.componentInstance.result = "Update Done"
        modal.close();
        
          const index = this.list.findIndex(
            (obj) => obj.group_id === id
          );
          
          if (index > -1) {
            this.list[index].group_name = name
          }
       
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
  // 
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
          const index = this.list.findIndex(
            (obj) => obj.group_id === element
          );
          if (index > -1) {
            this.list.splice(index, 1);
          }
        });
        this.selectedItems = []
       
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
  // 
  openAddModal(){
    const a = this.modalService.open(ModalAddGroup, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });

  }
  openUpdateNameModal(id:string,name:string){
    const a = this.modalService.open(ModalUpdatePermissionName, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
    a.componentInstance.id = id;
    a.componentInstance.preName = name
    a.componentInstance.newName = name
  }
}

export interface Group {
  group_id: string;
  group_name: string;
  group_created_at:Date,
  group_updated_at:Date
}
