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
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {

      this.sv.getUser().subscribe((res) => {
        this.userAll = res;
        console.log(this.userAll);
      });
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        if (this.loggedIn) {
          // กำหนด Role ผู้ใช้
          const userRole = user.id == '104502146614369152099' ? 'Admin' : 'User';

          // เก็บ Role ลงใน sessionStorage
          sessionStorage.setItem('userRole', userRole);

          // ตรวจสอบ Role และนำทาง
          if (userRole == 'Admin') {
            this.isAdmin = true;
            this.router.navigate(['admin/dashboard'], { queryParams: { name: user.name, role: userRole } });
          } else if (userRole == 'User') {
            this.isAdmin = false;
            this.router.navigate(['user']);
          }

          // ตรวจสอบผู้ใช้ในระบบ
          this.checkUsergoogle({
            user_id: null,
            username: user.email,
            name: user.name,
            user_role: userRole,
          });

        } else {
          this.isAdmin = false;
          sessionStorage.removeItem('userRole');
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  checkUsergoogle(user: any): void {
    // ตรวจสอบว่ามีข้อมูลผู้ใช้ทั้งหมดหรือไม่
    // ค้นหาผู้ใช้ในฐานข้อมูล
    const checkUser = this.userAll.find((u: any) => u.name === user.name);

    if (checkUser) {
      console.log(user.name, 'พบผู้ใช้งานแล้ว');
    } else {
      console.log('ไม่พบผู้ใช้งาน ทำการเพิ่มข้อมูลผู้ใช้');
      this.sv.addUser(user).subscribe(
        (response: any) => {
          console.log('ส่งข้อมูลผู้ใช้ไปยัง backend สำเร็จ:', response);
        },
        (error: any) => {
          console.error('เกิดข้อผิดพลาดในการส่งข้อมูลผู้ใช้ไปยัง backend:', error);
        }
      );
    }
  }

  async loginWithMicrosoft() {
    if (this.inProgress || this.isLoading) {
      return;
    }

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
    console.log(user,"user");
    localStorage.setItem('accessToken', user.accessToken);
    console.log(localStorage.getItem('accessToken'));

    this.checkUser(user);

    this.msalService.instance.setActiveAccount(user.account);
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
          this.router.navigate(['admin/dashboard'] ,{ queryParams: { name: user.account.name, role: user.idTokenClaims.roles }});
        } else if (user.idTokenClaims.roles.includes('User')) {
          console.log('User is a User');
          this.router.navigate(['user']);
        }
      } else {
        console.log('No roles');
        this.router.navigate(['user']);
      }
      localStorage.setItem('user_id', this.user_id||checkUser.user_id);
      localStorage.setItem('userRole', user.idTokenClaims.roles || 'User');
    } else {
      const data = {
        user_id: null,
        username: user.account.username,
        name: user.account.name,
        user_role: Array.isArray(user.idTokenClaims.roles)
          ? user.idTokenClaims.roles[0]
          : user.idTokenClaims.roles || 'User',
      };

      this.sv.addUser(data).subscribe((res) => {
        console.log(res);
        this.user_id = res
        console.log(this.user_id);

        localStorage.setItem('user_id', this.user_id||checkUser.user_id);
        localStorage.setItem('userRole', data.user_role);
      });

      // localStorage.setItem('user_id', this.user_id||checkUser.user_id);
      const role = sessionStorage.getItem('userRole');

      if (role == 'Admin') {
        this.router.navigate(['admin/dashboard']);
      } else if (role == 'User') {
        this.router.navigate(['user']);
      }

    }


  }
}
