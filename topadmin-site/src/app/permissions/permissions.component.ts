import { Component, inject } from '@angular/core';
import {
  PermissionsService,
} from '../services/permissions.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css',
})
export class PermissionsComponent {
  constructor(public service: PermissionsService) { }
  ngOnInit() {
    this.service.reset()
    this.service.read()
  }
}
