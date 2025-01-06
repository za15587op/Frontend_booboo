import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { LoginService } from '../../auth/login/login.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

    userAll: any;
    user: any;
    isLoading = false;
    inProgress = false;
    loggedIn: any;
    user_id:any

    constructor(
      private socialAuthService: SocialAuthService,
      private msalService: MsalService,
      private router: Router,
      private sv: LoginService
    ) {}


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
