import { Component, inject } from '@angular/core';
import {
  Permission,
  PermissionsService,
} from '../services/permissions.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddPermission } from './add-permissions.component';
import { GlobalService } from '../global.service';
import { ConfirmModal } from '../CBootstrap/modal/confirm/confirm-modal.component';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css',
})
export class PermissionsComponent {
  modalService = inject(NgbModal);
  selectedItems: string[] = [];



 
  constructor(public service: PermissionsService) { }

  ngOnInit() {
    this.service.read()
  }


  //   onSelectAll(event: any) {
  //     if (event.target.checked) {
  //       this.selectedItems= []
  //       this.permissionsService.permissions.forEach(e=>{
  //         this.selectedItems.push(e.permission_id)
  //       })
  //     } 
  //     else{
  //       this.selectedItems= []
  //     }
  //   }
  //   search(){
  //     this.selectedItems= []
  //     this.permissionsService.searchNative(this.permissionsService.searchValue).subscribe({
  //       next: (response) => {
  //         this.status = true;
  //         this.permissionsService.permissions = response;
  //         console.log(response);
  // if (response.length == 3) {
  //   this.isHaveMore = true;
  // } else {
  //   this.isHaveMore = false;
  // }
  // this.isLoadingMore = false;
  //       },
  //       error: (err) => {
  //         console.log(err);

  //         this.error = err.error.message.ar;
  //         this.status = false;
  //         this.isLoading = false;
  //         // this.permissions.deleteId()
  //       },
  //       complete: () => {
  //         this.isLoading = false;
  //         // this.permissions.deleteId()
  //       },
  //     });

  //   }
  //   selectItem(id: string) {
  //     const index = this.selectedItems.findIndex((el) => el === id);
  //     if (index > -1) {
  //       this.selectedItems.splice(index, 1);
  //     } else this.selectedItems.push(id);
  //   }
  //   readMore() {
  //     this.isLoadingMore = true;
  //     this.permissionsService.readMore().subscribe({
  //       next: (response) => {
  //         this.status = true;
  //         this.permissionsService.permissions =
  //           this.permissionsService.permissions.concat(response);
  //         if (response.length == 3) {
  //           this.isHaveMore = true;
  //         } else {
  //           this.isHaveMore = false;
  //         }
  //         this.isLoadingMore = false;
  //       },
  //       error: (err) => {
  //         // this.error = err.error.message.ar;
  //         // this.status = false;
  //         // this.isLoading = false;
  //         this.isLoadingMore = false;
  //       },
  //     });
  //   }
  //   myalert = (m:string) : void => { alert("mustafa") } 
  //   onAdd() {
  //     alerto: (m:string) => void
  //     this.test(this.myalert("d"))

  //     // const a = this.modalService.open(ModalAddPermission, {
  //     //   keyboard: false,
  //     //   backdrop: 'static',
  //     //   centered: true,
  //     // });
  //   }
  //   test(alerto:()=>void){
  // // alerto()
  //   }
  //   ngOnInit() {

  //     // console.info("id:",this.id);
  //     // // var id = JSON.stringify()
  //     // if (this.appsService.id != undefined) {
  //     //   this.appsService.addIdFormData()
  //     // }

  //     this.permissionsService.read().subscribe({
  //       next: (response) => {
  //         this.status = true;
  //         this.permissionsService.permissions = response;
  //         console.log(response);
  //         if (response.length == 3) {
  //           this.isHaveMore = true;
  //         } else {
  //           this.isHaveMore = false;
  //         }
  //         this.isLoadingMore = false;
  //       },
  //       error: (err) => {
  //         console.log(err);

  //         this.error = err.error.message.ar;
  //         this.status = false;
  //         this.isLoading = false;
  //         // this.permissions.deleteId()
  //       },
  //       complete: () => {
  //         this.isLoading = false;
  //         // this.permissions.deleteId()
  //       },
  //     });
  //   }
}
