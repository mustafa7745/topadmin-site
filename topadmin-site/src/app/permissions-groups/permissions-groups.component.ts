import { Component, inject, TemplateRef, Type } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbToastModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PermissionGroup, PermissionsGroupsService } from '../services/permissions-groups.service';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ToastService } from '../services/toast-service';

@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  template: `
		<div class="modal-header">
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
				<strong>Are you sure you want to delete {{name11}}</strong>
			</p>
			
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
			<button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Delete</button>
		</div>
	`,
})
export class NgbdModalConfirm {
  name11 = "muoi,";

  toastService = inject(ToastService);
  modal = inject(NgbActiveModal);
  delete(){
    this.toastService.show(standardTpl)

  }
}
@Component({
	selector: 'app-toasts',
	standalone: true,
	imports: [NgbToastModule, NgTemplateOutlet],
	template: `
		@for (toast of toastService.toasts; track toast) {
			<ngb-toast
				[class]="toast.classname"
				[autohide]="true"
				[delay]="toast.delay || 5000"
				(hidden)="toastService.remove(toast)"
			>
				<ng-template [ngTemplateOutlet]="toast.template"></ng-template>
			</ngb-toast>
		}
	`,
	host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastsContainer {
	toastService = inject(ToastService);
}

@Component({
  selector: 'ngbd-modal-focus',
  standalone: true,
  imports: [CommonModule,NgbToastModule,NgbTooltipModule, ToastsContainer],
  templateUrl: './permissions-groups.component.html',
  styleUrl: './permissions-groups.component.css'
})
export class PermissionsGroupsComponent {
  permissionsGroups: PermissionGroup[] = [];
  isLoading = true;
  status = false;
  error ='';
  show = true;

  constructor(
    private pgService:PermissionsGroupsService
  ){

  }
  toastService = inject(ToastService);
  showStandard(template: TemplateRef<any>) {
		this.toastService.show({ template });
	}

  private modalService = inject(NgbModal);
  ngOnInit() {
    this.pgService.read().subscribe({
      next: (response) => {
        this.status = true;
        this.permissionsGroups = response
      },
      error: (err) => {
        this.error = err.error.message.ar
        this.status = false;
        this.isLoading = false;
      }
      ,
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  open(name: string) {
   const a= this.modalService.open(NgbdModalConfirm);
   a.componentInstance.name11 = name
  }
}

