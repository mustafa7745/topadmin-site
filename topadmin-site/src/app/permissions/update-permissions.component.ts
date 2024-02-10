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
export class ModalUpdatePermissionName {
  constructor(private permissionService: PermissionsService) {

  }

  
  activeModal = inject(NgbActiveModal);
  modal = inject(NgbModal);
  newName = ''
  isDisabledSaveButton() {
    return !(this.newName.length > 0)
  }

  onSave() {
    this.permissionService
      .add(this.newName,this.activeModal)
  }
  
}
