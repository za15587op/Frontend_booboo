import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { GoogleLoginProvider} from '@abacritt/angularx-social-login';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { DashBoardComponent } from './admin/dashboard/dashboard.component';
import { AdminProcessComponent } from './admin/admin-process/admin-process.component';
import { UploadFileComponent } from './admin/uploadfile/uploadfile.component';
import { ShowComponent } from './admin/show/show.component';
import { AdminFileINFOComponent } from './admin/admin-file-info/admin-file-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './component/navbar/navbar.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'baafcd8b-bbd8-4209-8c49-b33ea0df8690',
      redirectUri: 'http://localhost:4200',
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    AdminProcessComponent,
    UploadFileComponent,
    ShowComponent,
    AdminFileINFOComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule,
    MsalModule
  ],
  providers: [provideHttpClient(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '978135281931-l3vsfqem6c1oj6htbmqngg2ot7akd7e1.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
