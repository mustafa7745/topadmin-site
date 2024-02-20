import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbDropdownModule, NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PermissionsService } from "../services/permissions.service";

@Component({
  selector: 'ngbd-modal-add-permission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./add-permissions.component.html"
  
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

  onSave() {
    this.permissionService
      .add(this.newName,this.activeModal)
  }
  
}
