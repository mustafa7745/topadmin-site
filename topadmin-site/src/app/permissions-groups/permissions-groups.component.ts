import { Component, inject   } from '@angular/core';
import {
  NgbActiveModal,
  NgbDropdownModule,
  NgbModal,
  NgbModalRef,
  NgbToastModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  PermissionsGroupsService,
} from '../services/permissions-groups.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Permission,
  PermissionsService,
} from '../services/permissions.service';
import { LoadingModal } from '../CBootstrap/modal/loading/loading-modal.component';
import { ConfirmModal } from '../CBootstrap/modal/confirm/confirm-modal.component';
import { SuccessInfoModal } from '../CBootstrap/modal/success-info/successinfo-modal.component';
import { Router } from '@angular/router';





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
  //
  isHaveMore = false;
  isLoadingMore = false;
  selectedItems: string[] = [];
  deletedIDS: any;
  // 

  constructor(public pgService: PermissionsGroupsService, private modalService: NgbModal,private router:Router) { }

  onSelectItem(event: any, id: string) {
    if (event.target.checked) {
      this.selectedItems.push(id);
      var ids = '{}';
      var j = JSON.parse(ids);
      for (let index = 0; index < this.selectedItems.length; index++) {
        j[index + 1] = this.selectedItems[index].toString();
      }
      this.deletedIDS = JSON.stringify(j);
    } else {
      // this.selectedItems.re
      const index = this.selectedItems.findIndex((el) => el === id);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      }
    }
    // console.log(event.target.checked);
  }

  ngOnInit() {
    if (this.pgService.id == undefined) {
      this.router.navigate(['/dashboard/groups'], { replaceUrl: true })
    }
    this.read();
  }
  read() {
    this.pgService.read().subscribe({
      next: (response) => {
        this.status = true;
        this.pgService.permissionsGroups = response;
        if (response.length == 3) {
          this.isHaveMore = true;
        } else {
          this.isHaveMore = false;
        }
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
  readMore() {
    this.isLoadingMore = true;
    this.pgService.readMore().subscribe({
      next: (response) => {
        this.status = true;
        this.pgService.permissionsGroups =
          this.pgService.permissionsGroups.concat(response);
        if (response.length == 3) {
          this.isHaveMore = true;
        } else {
          this.isHaveMore = false;
        }
        this.isLoadingMore = false;
      },
      error: (err) => {
        // this.error = err.error.message.ar;
        // this.status = false;
        // this.isLoading = false;
        this.isLoadingMore = false;
      },
    });
  }
  refresh() {
    this.read();
  }
  onDelete() {

    // this.activeModal.close()
    // console.log(this.idsJson);
    // this.modal.close();
    const a = this.modalService.open(LoadingModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });

    a.componentInstance.title = "Deleting ... "
    // const id = JSON.stringify({ '1': this.id });
    this.pgService.delete(this.deletedIDS).subscribe({
      next: (response) => {
        a.close();
        this.selectedItems.forEach((element) => {
          const index = this.pgService.permissionsGroups.findIndex(
            (obj) => obj.permission_group_id === element
          );
          if (index > -1) {
            this.pgService.permissionsGroups.splice(index, 1);
          }
        });
       
        const res = this.modalService.open(SuccessInfoModal, {
          keyboard: false,
          backdrop: 'static',
          centered: true,
        });
        res.componentInstance.result = 'Deleted';
      },
      error: (err) => {
        a.close();
        console.log(err);

        const res = this.modalService.open(SuccessInfoModal, {
          keyboard: false,
          backdrop: 'static',
          centered: true,
        });
        if (err.status === 400) {
          res.componentInstance.result = err.error.message.en;
        } else {
          res.componentInstance.result = 'fail';
        }
      },
    });

  }

  delete() {
    const a = this.modalService.open(ConfirmModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });

    a.result.then(r => {
      this.onDelete()
      a.close()

    }).catch(e => {
      console.log("mustaaffff");
      console.log(e);
    })

  }
  openAdd() {
    const a = this.modalService.open(NgbdModalAdd, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    })
    // const id = JSON.parse(this.pgService.id);
    a.componentInstance.group_id = this.pgService.id;
  }
}

@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, FormsModule],
  templateUrl: "./add-permissions-groups.component.html",
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
  isLoading = false
  status :Boolean | undefined
  selectedPerm: Permission | undefined;
  error = ''
  group_id: any;
  p: Permission[] = [];
  name = '';
  modal = inject(NgbActiveModal);
  constructor(
    public permissionsService: PermissionsService,
    private pgService: PermissionsGroupsService
  ) { }
  setPer(per: Permission | undefined) {
    this.selectedPerm = per;
  }
  search(event: any) {
    this.error = ''
    this.isLoading = true;
    const value = (event.target as HTMLInputElement).value;
    this.name = value;
    this.permissionsService.search(value, this.group_id).subscribe({
      next: (response) => {
        this.status = true;
        this.p = response;
        console.log(response);
        this.isLoading = false;
      },
      error: (err) => {
        this.status = false;
        console.log(err);
        this.isLoading = false;
        this.error = "error server"

      },
      complete: () => {
       
      },
    });
  }
  successModal = inject(NgbModal);
  onAdd() {
    const a = this.successModal.open(LoadingModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
    a.componentInstance.title = "Adding ... "

    this.pgService
      .add(this.selectedPerm?.permission_id, this.group_id)
      .subscribe({
        next: (response) => {
          a.close();
          this.modal.close();

          const res = this.successModal.open(SuccessInfoModal, {
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

          const res = this.successModal.open(SuccessInfoModal, {
            keyboard: false,
            backdrop: 'static',
            centered: true,
          });
          if (err.status === 400) {
            res.componentInstance.result = err.error.message.en;
          } else {
            res.componentInstance.result = 'fail';
          }
        },
      });
  }
}
