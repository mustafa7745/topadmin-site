import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbDropdownModule, NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PermissionsService } from "../services/permissions.service";
import { LoadingModal } from "../CBootstrap/modal/loading/loading-modal.component";
import { SuccessInfoModal } from "../CBootstrap/modal/success-info/successinfo-modal.component";

@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, FormsModule],
  templateUrl: "./add-permissions.component.html",
})
export class ModalAddPermission {
  constructor(private permissionService: PermissionsService) {

  }
  activeModal = inject(NgbActiveModal);
  modal = inject(NgbModal);
  newName = ''
  isDisabledSaveButton() {
    return !(this.newName.length > 0)
  }

  // onSave() {
  //   const a = this.modal.open(LoadingModal, {
  //     keyboard: false,
  //     backdrop: 'static',
  //     centered: true,
  //   });
  //   a.componentInstance.title = "Adding ... "

  //   this.permissionService
  //     .add(this.newName)
  //     .subscribe({
  //       next: (response) => {
  //         a.close();
  //         this.activeModal.close();
          
  //         const res = this.modal.open(SuccessInfoModal, {
  //           keyboard: false,
  //           backdrop: 'static',
  //           centered: true,
  //         });
  //         res.componentInstance.result = 'Done';
  //       },
  //       error: (err) => {
  //         a.close();
  //         this.activeModal.close();
  //         console.log(err);

  //         const res = this.modal.open(SuccessInfoModal, {
  //           keyboard: false,
  //           backdrop: 'static',
  //           centered: true,
  //         });
  //         if (err.status === 400) {
  //           res.componentInstance.result = err.error.message.en;
  //         } else {
  //           res.componentInstance.result = 'fail';
  //         }
  //       },
  //     });
  // }
}
