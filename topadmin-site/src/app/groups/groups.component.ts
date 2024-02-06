import { Component } from '@angular/core';
import { Group, GroupsService } from '../services/groups.service';
import { CommonModule } from '@angular/common';
import { AppsService } from '../services/apps.service';
import { Router, RouterModule } from '@angular/router';
import { PermissionsService } from '../services/permissions.service';
import { AppsGroupsService } from '../services/apps-groups.service';
import { PermissionsGroupsService } from '../services/permissions-groups.service';


@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent {

  groups: Group[] = [];
  isLoading = true;
  status = false;
  error = '';

  constructor(
    private router: Router,
    private appsGroupsService:AppsGroupsService,
    private permissionsGroupsService:PermissionsGroupsService,
    private appService: AppsService,
    private groupService: GroupsService,
    private permissionsService:PermissionsService

  ) {

  }
  goAppGroup(group_id: any) {
    
    var id = JSON.stringify({"type":"group","id":group_id})
    this.appsGroupsService.id = id
    this.router.navigate(['/dashboard/groups/apps-group/']);
  }
  goPermissions(group_id:any){
    // var id = JSON.stringify({"type":"group","id":group_id})
    this.permissionsGroupsService.id = group_id
    // var id = JSON.stringify({"type":"group","id":group_id})
    // this.permissionsService.id = id
    // this.permissionsService.addIdFormData()
    // 
    this.router.navigate(['/dashboard/groups/permissions-group']);
  }

  ngOnInit() {
    this.groupService.read().subscribe({
      next: (response) => {
        this.status = true;
        this.groups = response
        console.log(response);

      },
      error: (err) => {
        this.error = err.error.message.ar
        this.status = false;
        this.isLoading = false;
        this.permissionsService.deleteId()
        
      }
      ,
      complete: () => {
        this.isLoading = false;
        this.permissionsService.deleteId()
      }
      
    })
  }

}
