import { Component } from '@angular/core';
import {
  Permission,
  PermissionsService,
} from '../services/permissions.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css',
})
export class PermissionsComponent {
  selectedItems: string[] = [];
 
  isLoading = true;
  status = false;
  error = '';
  //
  isHaveMore = false;
  isLoadingMore = false;
  // 
  constructor(public permissionsService: PermissionsService) {}
  onSelectAll(event: any) {
    if (event.target.checked) {
      this.selectedItems= []
      this.permissionsService.permissions.forEach(e=>{
        this.selectedItems.push(e.permission_id)
      })
    }
    else{
      this.selectedItems= []
    }
  }
  selectItem(id: string) {
    const index = this.selectedItems.findIndex((el) => el === id);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else this.selectedItems.push(id);
  }
  readMore() {
    this.isLoadingMore = true;
    this.permissionsService.readMore().subscribe({
      next: (response) => {
        this.status = true;
        this.permissionsService.permissions =
          this.permissionsService.permissions.concat(response);
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
  ngOnInit() {
    
    // console.info("id:",this.id);
    // // var id = JSON.stringify()
    // if (this.appsService.id != undefined) {
    //   this.appsService.addIdFormData()
    // }

    this.permissionsService.read().subscribe({
      next: (response) => {
        this.status = true;
        this.permissionsService.permissions = response;
        console.log(response);
        if (response.length == 3) {
          this.isHaveMore = true;
        } else {
          this.isHaveMore = false;
        }
        this.isLoadingMore = false;
      },
      error: (err) => {
        console.log(err);

        this.error = err.error.message.ar;
        this.status = false;
        this.isLoading = false;
        // this.permissions.deleteId()
      },
      complete: () => {
        this.isLoading = false;
        // this.permissions.deleteId()
      },
    });
  }
}
