import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent {
  urlInit = 'user/init.php'
  error: any;
  isLoading = true;

  constructor(
    private router: Router,
    private globalService:GlobalService,
    private apiService:ApiService
  ) { 
    // this.globalService.request(this.globalService.apiService.formData, this.urlInit).subscribe({
    //   next: (response) => {
    //     console.log("donnnn");
        
    //     this.router.navigate(['/login'], { replaceUrl: true });
    //   },
    //   error: (err) => {
    //     this.error = this.globalService.errorMessage(err)
    //     this.isLoading = false
    //   },
    // });
    // console.log(this.error);
  }

  ngOnInit() {
   this.globalService.request(this.apiService.formData, this.urlInit).subscribe({
      next: (response) => {
        console.log("donnnn");
        
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      error: (err) => {
        this.error = this.globalService.errorMessage(err)
        this.isLoading = false
      },
    });
    console.log(this.error);
    
  }
}
