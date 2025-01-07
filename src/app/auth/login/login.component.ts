import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
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
  loginTimeout: any = null;
  loggedIn: any;
  user_id:any
  isAdmin : any;

  constructor(
    private authService: SocialAuthService,
    private msalService: MsalService,
    private router: Router,
    private sv: LoginService
  ) {}

  ngOnInit(): void {
    this.msalService.initialize();
    this.sendUserDataToBackend
    this.clearLoginState();

    this.sv.getUser().subscribe((res) => {
      this.userAll = res;
      console.log(this.userAll);
    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        // กำหนด Role ผู้ใช้ (ตัวอย่าง)
        const userRole = user.id === '114655793156976911639' ? 'Admin' : 'User';
      
        // เก็บ Role ลงใน LocalStorage
        localStorage.setItem('userRole', userRole);
        
      
        // ตรวจสอบ Role และนำทาง
        if (userRole === 'Admin') {
          this.isAdmin = true;
          this.router.navigate(['admin/dashboard']);
           // เส้นทางสำหรับผู้ดูแลระบบ
        } else if (userRole === 'User') {
          this.isAdmin = false;
          this.router.navigate(['user']);
        }
        this.sendUserDataToBackend({
          user_id: null,
          username: user.email,
          name: user.name,
          user_role: userRole,
        });

      } else {
        this.isAdmin = false;
        localStorage.removeItem('userRole');
      }

    console.log('User:', this.user , 'Role:', localStorage.getItem('userRole'));
      });

  }
  sendUserDataToBackend(data:any): void {
  this.sv.addUser(data).subscribe(
    (response: any) => {
      console.log('User data successfully sent to backend:', response);
    },
    (error: any) => {
      console.error('Error sending user data to backend:', error);
    }
  );
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

  isLoggedIn(): boolean {
    return !!(this.msalService.instance.getActiveAccount() || this.user);
  }

  checkUser(user: any) {
    const checkUser = this.userAll.find(
      (u: any) => u.username == user.account.username
    );

    if (checkUser) {
      if (user.idTokenClaims.roles) {
        if (user.idTokenClaims.roles.includes('Admin')) {
          console.log('User is an Admin');
          this.router.navigate(['admin/dashboard']);
        } else if (user.idTokenClaims.roles.includes('User')) {
          console.log('User is a User');
          this.router.navigate(['user']);
        }
      } else {
        console.log('No roles');
        this.router.navigate(['user']);
      }
      sessionStorage.setItem('user_id', this.user_id||checkUser.user_id);
    } else {
      const data = {
        user_id: null,
        username: user.account.username,
        name: user.account.name,
        user_role: Array.isArray(user.idTokenClaims.roles)
          ? user.idTokenClaims.roles[0]
          : user.idTokenClaims.roles || 'User',
      };

      console.log('Data:', data);

      this.sv.addUser(data).subscribe((res) => {
        console.log(res);
        this.user_id = res
        console.log(this.user_id);

        sessionStorage.setItem('user_id', this.user_id||checkUser.user_id);
      });
    }


  }
}
