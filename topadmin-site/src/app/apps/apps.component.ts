import { Component, Input } from '@angular/core';
import { App, AppsService } from '../services/apps.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.css'
})
export class AppsComponent {
  @Input() id!:string;
  constructor(
    private route:ActivatedRoute,
    private appsService:AppsService
  ){

  }

  apps: App[] = [];
  isLoading = true;
  status = false;
  error ='';

  ngOnInit() {
    console.info("id:",this.id);
    // var id = JSON.stringify()
    if (this.appsService.id != undefined) {
      this.appsService.addIdFormData()
    }
    
    this.appsService.read().subscribe({
      next: (response) => {
        this.status = true;
        this.apps = response
        console.log(response);

      },
      error: (err) => {
        console.log(err);
        
        this.error = err.error.message.ar
        this.status = false;
        this.isLoading = false;
        this.appsService.deleteId()
      }
      ,
      complete: () => {
        this.isLoading = false;
        this.appsService.deleteId()
      }
    })
  }
}
