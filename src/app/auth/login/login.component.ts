import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { IdTokenClaims } from '@azure/msal-browser';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  user: any;
  isLoading = false;
  inProgress = false;
  private loginTimeout: any = null;
  loggedIn: any;

  constructor(
    private socialAuthService: SocialAuthService,
    private msalService: MsalService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.msalService.initialize();
    this.clearLoginState();

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(this.user);
    });
  }

  clearLoginState(): void {
    this.isLoading = false;
    this.inProgress = false;
    if (this.loginTimeout) {
      clearTimeout(this.loginTimeout);
      this.loginTimeout = null;
    }
  }

  async loginWithMicrosoft() {
    if (this.inProgress || this.isLoading) {
      return;
    }

    this.clearLoginState();
    this.isLoading = true;
    this.inProgress = true;

    await this.msalService.instance.clearCache();

    const loginRequest = {
      scopes: ['user.read'],
      prompt: 'select_account',
    };

    const response = await firstValueFrom(
      this.msalService.loginPopup(loginRequest)
    );
    console.log('Login response:', response);
    console.log('role:', response.idTokenClaims);

    const idTokenClaims = response.idTokenClaims as IdTokenClaims;

    if (idTokenClaims && idTokenClaims['roles']) {
      const userRoles = idTokenClaims['roles'];
      console.log('User Roles:', userRoles);

      if (userRoles.includes('Admin')) {
        console.log('User is an Admin');
        this.router.navigate(['admin/dashboard']);

      }if (userRoles.includes('User')) {
        console.log('User is an User');
        this.router.navigate(['user/show']);

      }
    } else {
      console.log('No roles');
      this.router.navigate(['user/show']);
    }

    this.msalService.instance.setActiveAccount(response.account);
    this.clearLoginState();
  }

  logout() {
    if (this.inProgress || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.inProgress = true;

    if (this.msalService.instance.getActiveAccount()) {
      firstValueFrom(this.msalService.logout());
    }

    if (this.user) {
      this.socialAuthService.signOut();
    }

    this.user = null;
    this.msalService.instance.clearCache();
  }

  isLoggedIn(): boolean {
    return !!(this.msalService.instance.getActiveAccount() || this.user);
  }
}
