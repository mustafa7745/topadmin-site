import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbDropdownModule, NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GroupsService } from "../services/groups.service";

@Component({
  selector: 'ngbd-modal-add',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, FormsModule],
  templateUrl: "./add-group.component.html"
  
})
export class ModalAddGroup {
  constructor(private service: GroupsService) {

  }
  activeModal = inject(NgbActiveModal);
  modal = inject(NgbModal);
  newName = ''
  isDisabledSaveButton() {
    return !(this.newName.length > 0)
  }

  onSave() {
    this.service
      .add(this.newName,this.activeModal)
  }
  
}
