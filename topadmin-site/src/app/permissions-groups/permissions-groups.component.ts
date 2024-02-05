import { Component, inject, TemplateRef, Type } from '@angular/core';
import {
  NgbActiveModal,
  NgbDropdownModule,
  NgbModal,
  NgbToastModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  PermissionGroup,
  PermissionsGroupsService,
} from '../services/permissions-groups.service';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ToastService } from '../services/toast-service';
import { log } from 'console';
import { FormsModule } from '@angular/forms';
import { Permission, PermissionsService } from '../services/permissions.service';

@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  template: `
    <div class="modal-header bg-success">
      <h4 class="modal-title" id="modal-title">Profile deletion</h4>
      <button
        type="button"
        class="btn-close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <p>
        <strong>Are you sure you want to delete {{ name11 }}</strong>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button type="button" class="btn btn-danger" (click)="delete()">
        Delete
      </button>
    </div>
  `,
})
export class NgbdModalConfirm {
  name11: any;
  id: any;
  constructor(private pgService: PermissionsGroupsService) {}
  modal = inject(NgbActiveModal);
  loadingModal = inject(NgbModal);
  delete() {
    this.modal.close();
    const a = this.loadingModal.open(NgbdModalLoading, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
    const id = JSON.stringify({ '1': this.id });
    this.pgService.delete(id).subscribe({
      next: (response) => {
        a.close();
        const index = this.pgService.permissionsGroups.findIndex(
          (obj) => obj.permission_group_id === this.id
        );
        if (index > -1) {
          this.pgService.permissionsGroups.splice(index, 1);
        }
        const res = this.loadingModal.open(NgbdModalSuccessResult, {
          keyboard: false,
          backdrop: 'static',
          centered: true,
        });
        res.componentInstance.result = 'Deleted';
      },
      error: (err) => {
        a.close();
        const res = this.loadingModal.open(NgbdModalSuccessResult, {
          keyboard: false,
          backdrop: 'static',
          centered: true,
        });
        res.componentInstance.result = 'fail';
      },
    });
  }
}
@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Deleteing...</h4>
    </div>
    <div class="modal-body">
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  `,
})
export class NgbdModalLoading {
  modal = inject(NgbActiveModal);
}

@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{ result }}</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="onOk()">
        OK
      </button>
    </div>
  `,
})
export class NgbdModalSuccessResult {
  result: any;
  modal = inject(NgbActiveModal);
  onOk() {
    this.modal.close();
  }
}

@Component({
  selector: 'ngbd-modal-focus',
  standalone: true,
  imports: [CommonModule, NgbToastModule, NgbTooltipModule],
  templateUrl: './permissions-groups.component.html',
  styleUrl: './permissions-groups.component.css',
})
export class PermissionsGroupsComponent {
  isLoading = true;
  status = false;
  error = '';
  show = true;

  constructor(public pgService: PermissionsGroupsService) {}

  private modalService = inject(NgbModal);
  ngOnInit() {
    this.pgService.read().subscribe({
      next: (response) => {
        this.status = true;
        this.pgService.permissionsGroups = response;
        console.log(response);
      },
      error: (err) => {
        this.error = err.error.message.ar;
        this.status = false;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  open(name: string, id: any) {
    const a = this.modalService.open(NgbdModalConfirm, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
    a.componentInstance.name11 = name;
    a.componentInstance.id = id;
  }
  openAdd() {
    const a = this.modalService.open(NgbdModalAdd, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
  }
}

@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  imports: [NgbDropdownModule,CommonModule,FormsModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Add Permission Group</h4>
      <button
        type="button"
        class="btn-close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col">
          <div ngbDropdown class="d-inline-block">
            <button
              type="button"
              class="btn btn-outline-primary"
              id="dropdownBasic1"
              ngbDropdownToggle
            >
              Select Permession
            </button>
            <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
              <div class="active-pink-3 active-pink-4 mb-4">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  (input)="search($event)"
                />
              </div>
            {{p}}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NgbdModalAdd {
  p : Permission[] = []
  name = '';
  modal = inject(NgbActiveModal);
  constructor(public permissionsService: PermissionsService) {}
  search(event:any){
    const value = ((event.target as HTMLInputElement).value);
    this.name = value;

    this.permissionsService.search(value).subscribe({
      next: (response) => {
        // this.status = true;
        this.p = response;
        console.log(response);
      },
      error: (err) => {
        console.log(err);
        
        // this.error = err.error.message.ar;
        // this.status = false;
        // this.isLoading = false;
      },
      complete: () => {
        // this.isLoading = false;
      },
    });
  }

}
