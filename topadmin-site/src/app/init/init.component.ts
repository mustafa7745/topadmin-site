import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css',
})
export class InitComponent {
  urlInit = 'user/init.php';
  error: any;
  isLoading = false;

  constructor(private globalService: GlobalService) {}

  ngOnInit() {
    this.globalService.browserPlatform(() => {
      if (this.globalService.getInitFromStorage() == null) {
        this.isLoading = true
        this.globalService
          .request(this.globalService.apiService.formData, this.urlInit)
          .subscribe({
            next: () => {
              this.globalService.setInitToStorage();
              this.navigateToLogin();
            },
            error: (err) => {
              this.error = this.globalService.errorMessage(err);
              this.isLoading = false;
            },
          });
      } else {
        this.navigateToLogin();
      }
    });
  }
  navigateToLogin() {
    this.globalService.router.navigate(['/login'], {replaceUrl: true });
  }
}
