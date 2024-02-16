import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component} from '@angular/core';
import { LoginService } from '../services/login.service';
import { GlobalService } from '../global.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[GlobalService]
})
export class LoginComponent {
  error = '';
  isLoading = false;
  isLogined = true

  constructor(
    private globalService: GlobalService,
    private loginService:LoginService
  ) {}
  ngOnInit() {
    this.globalService.browserPlatform(() => {
      if (this.globalService.getInitFromStorage() == null) {
       this.globalService.navigateToHome()
      } else {
        if (this.globalService.isLogin()) {
         this.globalService.navigateToDashboard()
        }
        else{
          this.isLogined = false
        }
      }
    });
  }

  phone: string = '';
  password: string = '';

  validateInput(): boolean {
    if (
      this.phone.length == 9 &&
      this.isNumber(this.phone) &&
      this.password.length > 4 &&
      !this.isLoading
    ) {
      return true;
    } else {
      return false;
    }
  }
  getPhone() {
    const phone = this.phone;
    return '967' + phone;
  }

  login() {
    const password = this.password;
    //
    this.isLoading = true;
    this.error = '';
    // 
    const data2 = { user_phone: this.getPhone(), user_password: password };
    this.globalService.apiService.formData.append(
      'data2',
      JSON.stringify(data2)
    );
    // 

    this.globalService.request( this.globalService.apiService.formData,this.loginService.urlLogin).subscribe({
      next: () => {
        this.loginService.setLogin(this.getPhone(), password);
        this.globalService.navigateToDashboard()
      },
      error: (err) => {
        this.error = this.globalService.errorMessage(err)
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
 
  
  isNumber(value?: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
  }
}
