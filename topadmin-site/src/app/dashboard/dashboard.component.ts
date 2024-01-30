import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  phone: any;
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.check();
  }
  clickGroup(){
    // alert("groupp")
    this.router.navigate(['/groups']);
  }

  check() {
    if (this.loginService.isLogin()) {
      this.loginService
        .checkUser(
          'user/login.php',
          this.loginService.getPhone(),
          this.loginService.getPassword()
        )
        .subscribe({
          next: (response) => {},
          error: (err) => {
            if (err.status === 400) {
              this.loginService.removeUser();
              this.router.navigate(['/login']);
            } else {
              alert('error');
            }
          },
          complete: () => {
          },
        });

      this.phone = this.loginService.getPhone();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
