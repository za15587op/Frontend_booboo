import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { GoogleLoginProvider} from '@abacritt/angularx-social-login';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { DashBoardComponent } from './admin/dashboard/dashboard.component';
import { AdminProcessComponent } from './admin/admin-process/admin-process.component';
import { UploadFileComponent } from './admin/uploadfile/uploadfile.component';
import { AdminFileINFOComponent } from './admin/admin-file-info/admin-file-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MSAL_INSTANCE, MsalInterceptor, MsalModule, MsalService } from '@azure/msal-angular';
import { UserComponent } from './user/user.component';
import { DataStoredComponent } from './admin/data-stored/data-stored.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { loginInterceptor } from './auth/login/login.interceptor';
import { UserManageComponent } from './admin/user-manage/user-manage.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'baafcd8b-bbd8-4209-8c49-b33ea0df8690', // ใส่ Client ID ของคุณ
      redirectUri: 'http://localhost:4200', // ใส่ Redirect URI ตาม Azure
    },
    // cache: {
    //   cacheLocation: 'localStorage', // เก็บ token ใน localStorage
    //   storeAuthStateInCookie: false, // สำหรับเบราว์เซอร์ที่เข้มงวดเรื่อง cookie
    // },
  });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    AdminProcessComponent,
    UploadFileComponent,
    AdminFileINFOComponent,
    NavbarComponent,
    UserComponent,
    DataStoredComponent,
    UserManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule,
    MsalModule,
    FontAwesomeModule,
    FormsModule  // เพิ่ม MsalModule
  ],
  providers: [
    provideHttpClient(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('978135281931-l3vsfqem6c1oj6htbmqngg2ot7akd7e1.apps.googleusercontent.com',{
              scopes: ['email','profile'] ,prompt: 'none' // หรือ 'none'
            } ,), // Google Client ID
          },
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: loginInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
