import { Component } from '@angular/core';
import { App, AppsService } from '../services/apps.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.css'
})
export class AppsComponent {
  constructor(
    private appsService:AppsService
  ){

  }
  apps: App[] = [];
  isLoading = true;
  status = false;
  error ='';

  ngOnInit() {
    this.appsService.read().subscribe({
      next: (response) => {
        this.status = true;
        this.apps = response
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
