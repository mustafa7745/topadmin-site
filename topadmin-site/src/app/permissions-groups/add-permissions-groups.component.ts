import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbDropdownModule, NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoadingModal } from "../CBootstrap/modal/loading/loading-modal.component";
import { SuccessInfoModal } from "../CBootstrap/modal/success-info/successinfo-modal.component";
import { PermissionsGroupsService } from "../services/permissions-groups.service";
import { Permission, PermissionsService } from "../services/permissions.service";

@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, FormsModule],
  templateUrl: "./add-permissions-groups.component.html",
})
export class NgbdModalAdd {
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
  // search(event: any) {
  //   this.error = ''
  //   this.isLoading = true;
  //   const value = (event.target as HTMLInputElement).value;
  //   this.name = value;
  //   this.permissionsService.search(value, this.group_id).subscribe({
  //     next: (response) => {
  //       this.status = true;
  //       this.p = response;
  //       console.log(response);
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       this.status = false;
  //       console.log(err);
  //       this.isLoading = false;
  //       this.error = "error server"

  //     },
  //     complete: () => {
       
  //     },
  //   });
  // }
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
