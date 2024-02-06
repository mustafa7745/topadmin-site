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
  constructor(private pgService: PermissionsGroupsService) { }
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
        console.log(err);

        const res = this.loadingModal.open(NgbdModalSuccessResult, {
          keyboard: false,
          backdrop: 'static',
          centered: true,
        });
        if (err.status === 400) {
          res.componentInstance.result = err.error.message.en;
        }
        else {
          res.componentInstance.result = 'fail';
        }

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

  constructor(public pgService: PermissionsGroupsService) { }

  private modalService = inject(NgbModal);
  ngOnInit() {
    this.read()
  }
  read() {
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
  refresh() {
    this.read()
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
    const id = JSON.parse(this.pgService.id)
    a.componentInstance.group_id = id.id
  }
}

@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, FormsModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Add Permission Group {{group_id}}</h4>
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
            <div *ngIf="selectedPerm == undefined; then thenBlock; else elseBlock"></div>
<ng-template #thenBlock>Select Permession</ng-template>
<ng-template #elseBlock>{{selectedPerm?.permission_name}}</ng-template>
              
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
              <button class="btn btn-outline-primary me-2" (click)="setPer(undefined)">
              <div>None</div>
            </button>
              <ng-template ngFor let-item [ngForOf]="p" let-c="index">
              
              <button class="btn btn-primary me-2" (click)="setPer(item)">
              <div>{{ item.permission_name }}</div>
            </button>
            </ng-template>
          
           
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="onAdd()">
      Save
    </button>
  </div>
  `,
})
export class NgbdModalAdd {
  // b = { "TAG": "READ_PERMISSIONS", "FROM": "0"};
  // b = {
  //   "TAG": "SEARCH",
  //   "SEARCH_BY":"NAME",
  //   "SEARCH":"",
  //   "CAUSE":"ADD_TO_PG",
  //   "FROM": "0"
  // };
  // b = {
  //   "TAG": "READ",
  //   "CAUSE":"ADD_TO_PG",
  //   "FROM": "0"
  // };
  // b = {
  //     "TAG": "READ",
  //     "FROM": "0"
  //   };
  selectedPerm: Permission | undefined;
  group_id: any;
  p: Permission[] = []
  name = '';
  modal = inject(NgbActiveModal);
  constructor(public permissionsService: PermissionsService,
    private pgService: PermissionsGroupsService) { }
  setPer(per: Permission | undefined) {
    this.selectedPerm = per;
  }
  search(event: any) {
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
  successModal = inject(NgbModal);
  onAdd() {

    const a = this.successModal.open(NgbdModalLoading, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });

    this.pgService.add(this.selectedPerm?.permission_id, this.group_id).subscribe({
      next: (response) => {
        a.close();
        this.modal.close()

        const res = this.successModal.open(NgbdModalSuccessResult, {
          keyboard: false,
          backdrop: 'static',
          centered: true,
        });
        res.componentInstance.result = 'Done';
      },
      error: (err) => {
        a.close();
        this.modal.close();
        console.log(err);

        const res = this.successModal.open(NgbdModalSuccessResult, {
          keyboard: false,
          backdrop: 'static',
          centered: true,
        });
        if (err.status === 400) {
          res.componentInstance.result = err.error.message.en;
        }
        else {
          res.componentInstance.result = 'fail';
        }

      },
    });

  }
}
