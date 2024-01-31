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

  groups: Group[] = []

  constructor(
    private groupService: GroupsService,

  ) {

  }

  ngOnInit() {
    this.groupService.read().subscribe({
      next: (response) => {
        this.groups = response
        console.log(response);

      },
      error: (err) => {
        alert(JSON.stringify(err))
      }
      ,
      complete: () => {

      }
    })
  }

}
