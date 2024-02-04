import { Component } from '@angular/core';
import { Permissions, PermissionsService } from '../services/permissions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent {
  permissions: Permissions[] = [];
  isLoading = true;
  status = false;
  error ='';
  constructor(
    private permissionsService:PermissionsService
  ){

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
        this.permissions = response
        console.log(response);

      },
      error: (err) => {
        console.log(err);
        
        this.error = err.error.message.ar
        this.status = false;
        this.isLoading = false;
        // this.permissions.deleteId()
      }
      ,
      complete: () => {
        this.isLoading = false;
        // this.permissions.deleteId()
      }
    })
  }

}
