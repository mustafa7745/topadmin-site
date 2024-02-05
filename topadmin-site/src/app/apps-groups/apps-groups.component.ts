import { Component } from '@angular/core';
import { AppsGroups, AppsGroupsService } from '../services/apps-groups.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apps-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apps-groups.component.html',
  styleUrl: './apps-groups.component.css'
})
export class AppsGroupsComponent {
  appsGroups: AppsGroups[] = [];
  isLoading = true;
  status = false;
  error = '';
  constructor(
    // private router: Router,
    private appsGroupService: AppsGroupsService

  ) {

  }
  ngOnInit() {
    this.appsGroupService.read().subscribe({
      next: (response) => {
        this.status = true;
        this.appsGroups = response
        console.log(response);

      },
      error: (err) => {
        this.error = err.error.message.ar
        this.status = false;
        this.isLoading = false;
        // this.permissionsService.deleteId()
        
      }
      ,
      complete: () => {
        this.isLoading = false;
        // this.permissionsService.deleteId()
      }
      
    })
  }
}
