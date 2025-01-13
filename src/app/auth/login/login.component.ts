import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { firstValueFrom } from 'rxjs';
import { LoginService } from './login.service';
import { NavbarService } from '../../component/navbar/navbar.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  userAll: any;
  accessToken: string = '';
  user: any;
  isLoading = false;
  inProgress = false;
  loginTimeout: any = null;
  loggedIn: any;
  user_id:any
  role:any
  isAdmin : any;

  constructor(
    private authService: SocialAuthService,
    private msalService: MsalService,
    private router: Router,
    private sv: LoginService,
    private route:ActivatedRoute,
    private sv2: NavbarService
  ) {}

  ngOnInit(): void {
    this.msalService.initialize();
    this.checkAccessToken();
      this.sv.getUser().subscribe((res) => {
        this.userAll = res;
        console.log(this.userAll);
      });
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        if (this.loggedIn) {
          // กำหนด Role ผู้ใช้
          this.AccessToken();
          const userRole = user.id == '104502146614369152099' ? 'Admin' : 'User';

        // ตรวจสอบ Role และนำทาง
        if (userRole == 'Admin') {
          this.isAdmin = true;
          this.router.navigate(['admin'], { state: { name: user.name, role: userRole }
          });
           // เส้นทางสำหรับผู้ดูแลระบบ
        } else if (userRole == 'User') {
          this.isAdmin = false;
          this.router.navigate(['user']);
        }
        this.checkUsergoogle({
          user_id: null,
          username: user.email,
          name: user.name,
          user_role: userRole,
        });

      } else {
        this.isAdmin = false;
      }
      });

      //github
       this.route.queryParams.subscribe((params) => {
        console.log(params)
        const code = params['code'];
        if (code) {
          this.sv.exchangeCodeForToken(code).subscribe((response: any) => {
            console.log('Access Token:', response.access_token);
            console.log(response);

            const checkUser = this.userAll.find(
              (u: any) => u.username == response.user.login
            );

            if(!checkUser){
              const data = {
                user_id: null,
                username: response.user.login,
                name: response.user.name,
                user_role: 'User',
              };
              this.sv.addUser(data).subscribe((res) =>{
                console.log(res);
                this.user_id = res
                console.log(this.user_id);
                localStorage.setItem('user_id', JSON.stringify(this.user_id));

                this.role = data.user_role;
                console.log(this.role);
              })
            }

            this.role = checkUser.user_role;
            console.log(this.role);

            localStorage.setItem('user_id', checkUser.user_id);
            localStorage.setItem('accessToken',response.access_token);
            this.checkAccessToken();
          });

        }
      });

  }
  AccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => {
      this.accessToken = accessToken;
      console.log('Access Token:', this.accessToken);
      localStorage.setItem('accessToken',this.accessToken);
    });
  }

  checkUsergoogle(user: any): void {
    // ตรวจสอบว่ามีข้อมูลผู้ใช้ทั้งหมดหรือไม่
    // ค้นหาผู้ใช้ในฐานข้อมูล
    const checkUser = this.userAll.find((u: any) => u.name === user.name);

    if (checkUser) {
      console.log(user.name, 'พบผู้ใช้งานแล้ว');
      localStorage.setItem('user_id', this.user_id||checkUser.user_id);
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
    const checkUser = this.userAll?.find(
      (u: any) => u.username == user.account.username
    );

    if (checkUser) {
      if (user.idTokenClaims.roles) {
        if (user.idTokenClaims.roles.includes('Admin')) {
          console.log('User is an Admin');
          this.router.navigate(['admin']) ,{ state : { name: user.name, role: user.idTokenClaims.roles }}
        } else if (user.idTokenClaims.roles.includes('User')) {
          console.log('User is a User');
          this.router.navigate(['user']);
        }
      } else {
        console.log('No roles');
        this.router.navigate(['user']);
      }
      localStorage.setItem('user_id', this.user_id||checkUser.user_id);

      this.role = checkUser.user_role;
      console.log(this.role);


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
      });


      if (checkUser.user_role == 'Admin') {
        this.router.navigate(['admin']);
      } else if (checkUser.user_role == 'User') {
        this.router.navigate(['user']);
      }
    }
  }


   checkAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    const userName = localStorage.getItem('userName');


    if (accessToken) {
        const response = firstValueFrom(this.sv.getUser());
        this.userAll = response;

        const account = this.msalService.instance.getAllAccounts()[0];
        if (account) {
          this.msalService.instance.setActiveAccount(account);
        }

        if (this.role == 'Admin') {
          this.router.navigate(['admin'], {
            queryParams: { name: userName, role: this.role }
          });
        } else {
          this.router.navigate(['user']);
        }
      }
    }

    loginWithGitHub(){
      this.sv.loginWithGitHub();
    }


}


