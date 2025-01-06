import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { IdTokenClaims } from '@azure/msal-browser';
import { firstValueFrom } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  userAll: any;
  user: any;
  isLoading = false;
  inProgress = false;
  private loginTimeout: any = null;
  loggedIn: any;
  user_id:any

  constructor(
    private socialAuthService: SocialAuthService,
    private msalService: MsalService,
    private router: Router,
    private sv: LoginService
  ) {}

  ngOnInit(): void {
    this.msalService.initialize();
    this.clearLoginState();

    this.sv.getUser().subscribe((res) => {
      this.userAll = res;
      console.log(this.userAll);
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
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

    const user = await firstValueFrom(
      this.msalService.loginPopup(loginRequest)
    );

    this.checkUser(user);

    this.msalService.instance.setActiveAccount(user.account);
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

  checkUser(user: any) {
    const checkUser = this.userAll.find(
      (u: any) => u.username == user.account.username
    );

    this.sv.setUserId(checkUser?.user_id);

    if (checkUser) {
      if (user.idTokenClaims.roles) {
        if (user.idTokenClaims.roles.includes('Admin')) {
          console.log('User is an Admin');
          this.router.navigate(['admin/dashboard']);
        } else if (user.idTokenClaims.roles.includes('User')) {
          console.log('User is a User');
          this.router.navigate(['user/show']);
        }
      } else {
        console.log('No roles');
        this.router.navigate(['user/show']);
      }
    } else {
      const data = {
        user_id: null,
        username: user.account.username,
        name: user.account.name,
        token: user.idToken,
        user_role: Array.isArray(user.idTokenClaims.roles)
          ? user.idTokenClaims.roles[0]
          : user.idTokenClaims.roles || 'User',
      };

      console.log('Data:', data);

      this.sv.addUser(data).subscribe((res) => {
        console.log(res);
        this.user_id = res
        console.log(this.user_id);
      });

      this.sv.setUserId(this.user_id);

    }
  }
}
