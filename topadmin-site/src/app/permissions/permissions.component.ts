import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import {
  PermissionsService,
} from '../services/permissions.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css',
})
export class PermissionsComponent {
  constructor(public service: PermissionsService,
    @Inject(PLATFORM_ID) private _platformId: Object) { }
  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.service.reset()
      this.service.read()
    }

  }
}
