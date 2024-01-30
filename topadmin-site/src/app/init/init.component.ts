import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent {
  responseCode: any;
  data: any;
  isLoading = true;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {



    this.http
      // .post('http://localhost/onemegasoft1/test.php',formData)
      .post(this.apiService.apiUrl + 'user/init.php', this.apiService.formData)
      .subscribe(
        (data) => {
          this.responseCode = 200;
          // this.data = "You can go next step";
          this.isLoading = false
          this.router.navigate(['/login']);
        },
        (e) => {
          this.responseCode = e.status;
          if (e.status === 400) {
            this.data = e.error.message.ar;
          }
          else {
            this.data = "UN Error";
          }
          this.isLoading = false
        }

      );
  }
}
