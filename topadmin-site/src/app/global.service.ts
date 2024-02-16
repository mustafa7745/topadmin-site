import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { ApiService } from './services/api.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SuccessInfoModal } from './CBootstrap/modal/success-info/successinfo-modal.component';
import { LoadingModal } from './CBootstrap/modal/loading/loading-modal.component';
import { ErrorInfoModal } from './CBootstrap/modal/error-info/errorinfo-modal.component';
import { ConfirmModal } from './CBootstrap/modal/confirm/confirm-modal.component';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  modalService = inject(NgbModal);
  constructor(
    public apiService: ApiService,
    public router: Router,
    public route: ActivatedRoute,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.init();
  }

  init() {
    this.browserPlatform(() => {
      this.apiService.init();
      this.phone = this.getPhone();
      this.password = this.getPassword();
    });
  }
  ngOnInit() {
    this.init();
  }

  private phone: any;
  private password: any;
  loginLocalstorage = 'islogin';

  browserPlatform(data: () => void) {
    if (isPlatformBrowser(this._platformId)) {
      data();
    }
  }
  //
  getPhone() {
    var data = localStorage.getItem(this.loginLocalstorage);
    if (data == undefined) {
      this.navigateToLogin();
    } else {
      return JSON.parse(data!).phone;
    }
  }
  getPassword() {
    var data = localStorage.getItem(this.loginLocalstorage);
    if (data == undefined) {
      this.navigateToLogin();
    } else {
      return JSON.parse(data!).password;
    }
  }
  getFormData(): any {
    this.init();
    const data2 = {
      user_phone: this.phone,
      user_password: this.password,
    };
    this.apiService.formData.append('data2', JSON.stringify(data2));
    return this.apiService.formData;
  }
  isLogin(): boolean {
    if (!localStorage.getItem(this.loginLocalstorage)) {
      return false;
    }
    return true;
  }
  removeUser() {
    localStorage.removeItem(this.loginLocalstorage);
  }
  //
  request<type>(formData: any, url: string) {
    const req = this.apiService.http.post<type[]>(
      this.apiService.apiUrl + url,
      formData
    );
    return req;
  }
  errorMessage(err: any) {
    // console.log(err);

    if (err.status === 400) {
      if (err.error.code == 1070) {
        alert(err.error.message.ar)
        this.removeUser();
        this.init()
      }else if(err.error.code == 1050){        
        alert(err.error.message.ar)
        this.removeUser();
        this.init()
      }
      else
      return err.error.message.ar;
    }
    if (err.status === 404) {
      return 'Request not found';
    } else {
      return 'UN Error';
    }
  }
  ids(selectedItems: string[]) {
    var emptyJson = '{}';
    var ids = JSON.parse(emptyJson);
    for (let index = 0; index < selectedItems.length; index++) {
      ids[index + 1] = selectedItems[index].toString();
    }
    return ids;
  }
  //
  navigateToDashboard() {
    this.router.navigate(['/dashboard'], { replaceUrl: true });
  }
  navigateToHome() {
    this.router.navigate(['/'], {  replaceUrl: true });
  }
  navigateToLogin() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  //

  getInitFromStorage() {
    return localStorage.getItem('init');
  }
  setInitToStorage() {
    return localStorage.setItem('init', Math.random().toString());
  }
  //

  successModal(): NgbModalRef {
    return this.modalService.open(SuccessInfoModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
  }
  loadingModal(): NgbModalRef {
    return this.modalService.open(LoadingModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
  }
  errorModal(): NgbModalRef {
    return this.modalService.open(ErrorInfoModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
  }
  confirmModal(): NgbModalRef {
    return this.modalService.open(ConfirmModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
  }
}
