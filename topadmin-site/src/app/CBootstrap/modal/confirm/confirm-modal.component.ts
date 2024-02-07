import { Component, inject } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";

@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  template: `
    <div class="modal-header bg-success">
      <h4 class="modal-title" id="modal-title">{{title}}</h4>
      <button
        type="button"
        class="btn-close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <p>
        <strong>{{discription}}</strong>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel')"
      >
        Cancel
      </button>
      <button type="button" class="btn btn-danger" (click)="modal.close(true)">
        Delete
      </button>
    </div>
  `,
})
export class ConfirmModal {
  title: any;
  discription: any;
  modal = inject(NgbActiveModal);
   onClose: Subject<Boolean> | undefined;

  prop3: Function | undefined;


  onClickConfirm() {
 this.modal.update
  }

  // constructor(private _bsModalRef: BsModalRef) { }

  public onConfirm(): void {
    this.onClose?.next(true);
    // this._bsModalRef.hide();
}

public onCancel(): void {
    this.onClose?.next(false);
    // this._bsModalRef.hide();
}

  // ids: string[] = [];
  // constructor(private pgService: PermissionsGroupsService) {}
  // modal = inject(NgbActiveModal);
  // loadingModal = inject(NgbModal);

  // delete() {
  //   console.log(this.idsJson);
  //   this.modal.close();
  //   const a = this.loadingModal.open(LoadingModal, {
  //     keyboard: false,
  //     backdrop: 'static',
  //     centered: true,
  //   });
  //   a.componentInstance.title = "Deleting ... "
  //   // const id = JSON.stringify({ '1': this.id });
  //   this.pgService.delete(this.idsJson).subscribe({
  //     next: (response) => {
  //       a.close();
  //       this.ids.forEach((element) => {
  //         const index = this.pgService.permissionsGroups.findIndex(
  //           (obj) => obj.permission_group_id === element
  //         );
  //         if (index > -1) {
  //           this.pgService.permissionsGroups.splice(index, 1);
  //         }
  //       });
  //       // const index = this.pgService.permissionsGroups.findIndex(
  //       //   (obj) => obj.permission_group_id === this.id
  //       // );
  //       // if (index > -1) {
  //       //   this.pgService.permissionsGroups.splice(index, 1);
  //       // }
  //       const res = this.loadingModal.open(NgbdModalSuccessResult, {
  //         keyboard: false,
  //         backdrop: 'static',
  //         centered: true,
  //       });
  //       res.componentInstance.result = 'Deleted';
  //     },
  //     error: (err) => {
  //       a.close();
  //       console.log(err);

  //       const res = this.loadingModal.open(NgbdModalSuccessResult, {
  //         keyboard: false,
  //         backdrop: 'static',
  //         centered: true,
  //       });
  //       if (err.status === 400) {
  //         res.componentInstance.result = err.error.message.en;
  //       } else {
  //         res.componentInstance.result = 'fail';
  //       }
  //     },
  //   });
  // }
}