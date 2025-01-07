import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { LoginService } from '../../auth/login/login.service';
import { firstValueFrom } from 'rxjs';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

    data:any
    user: any;
    isLoading = false;
    inProgress = false;
    loggedIn: any;
    user_id:any

    constructor(
      private socialAuthService: SocialAuthService,
      private msalService: MsalService,
      private router: Router,
      private sv: NavbarService
    ) {}

    ngOnInit(): void {
      const user_id = sessionStorage.getItem('user_id');
      console.log(user_id);

      if (user_id) {
        const body = { user_id: user_id };
        this.sv.getByUser(body).subscribe((res) =>{
          console.log(res,"navbar");
          this.data = res
        });
      }
    }


  logout() {
    sessionStorage.removeItem('user_id');

    if (this.msalService.instance.getActiveAccount()) {
      firstValueFrom(this.msalService.logout());
    }

    if (this.user) {
      this.socialAuthService.signOut();
    }

    this.user = null;
    this.msalService.instance.clearCache();
  }
}
