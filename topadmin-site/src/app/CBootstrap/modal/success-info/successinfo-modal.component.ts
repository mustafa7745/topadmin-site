import { Component, inject } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  templateUrl:'./successinfo-modal.component.html',
})
export class SuccessInfoModal {
  result = ''
  modal = inject(NgbActiveModal);
  onOk(){
    this.modal.close()
  }
}
