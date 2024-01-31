import { Component } from '@angular/core';
import { Group, GroupsService } from '../services/groups.service';
import { CommonModule } from '@angular/common';

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
  error ='';

  constructor(
    private groupService: GroupsService,

  ) {

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
