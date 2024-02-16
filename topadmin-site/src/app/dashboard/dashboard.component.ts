import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent{
  phone = '';
  password = ''
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService,
    private globalServce:GlobalService
    // 
    
  ) {}

  ngOnInit() {
    
     
  }
 
  clickGroup(){
    // alert("groupp")
    this.router.navigate(['/dashboard/groups']);
  }
  

  check() {
    
    // if (this.globalService.isLogin()) {
    //   this.loginService
    //     .checkUser(
    //       this.loginService.getPhone(),
    //       this.loginService.getPassword()
    //     )
    //     .subscribe({
    //       next: (response) => {},
    //       error: (err) => {
    //         if (err.status === 400) {
    //           this.loginService.removeUser();
    //           this.router.navigate(['/login'],{ replaceUrl: true });
    //         } else {
    //           if (isPlatformBrowser(this._platformId)){
    //             console.log(err);
              
    //           alert(this.globalServce.errorMessage(err));
    //           }
    //           if (isPlatformServer(this._platformId)){
    //             console.log(err);
              
    //           alert('error');
    //           }
              
    //         }
    //       },
    //       complete: () => {
    //       },
    //     });

    //   // this.phone = this.loginService.getPhone();
    // } else {
    //   this.router.navigate(['/login'],{ replaceUrl: true });
    // }
  }
}
