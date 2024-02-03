import { Component } from '@angular/core';
import { Group, GroupsService } from '../services/groups.service';
import { CommonModule } from '@angular/common';
import { AppsService } from '../services/apps.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule],
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
    private appService: AppsService,
    private groupService: GroupsService,

  ) {

  }
  setGroupId(group_id: any) {
    // var  id = JSON.stringify({'type':'group','id':group_id}) ;
    // // id = JSON.stringify(id);
    // console.log(id);
    // this.appService.addIdFormData(JSON.stringify(id));
    var id = JSON.stringify({"type":"group","id":group_id})
    this.router.navigate(['/dashboard/apps/' + id]);
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
      }
      ,
      complete: () => {
        this.isLoading = false;
      }
    })
  }

}
