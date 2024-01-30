import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component,  EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  error = ''
  isLoading = false;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private loginService:LoginService
  ) { 
   
  }
  ngOnInit() {
     if (this.loginService.isLogin()) {
      this.router.navigate(['/dashboard']);
     }
  }
  
  phone: string = '967';
  password: string = '';

  login() {
    const phone = this.phone
    const password = this.password
    // 
    this.isLoading = true
    this.error = ''

    this.loginService.checkUser('user/login.php',phone,password).subscribe({
      next:(response)=>{
        this.loginService.setLogin(phone,password)
        this.router.navigate(['/dashboard']);
      },
      error:(err)=>{
        if ( err.status === 400) {
          this.error = err.error.message.ar
        }
        else{
          this.error = "UN Error"
        }
        this.isLoading=false
      }
      ,
      complete:()=>{
        this.isLoading=false
      }
     })
  }

 
}
