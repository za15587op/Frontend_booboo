import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUploadComponent } from './admin-upload/admin-upload.component';
import { AdminFileINFOComponent } from './admin-file-info/admin-file-info.component';
import { AdminDataComponent } from './admin-data/admin-data.component';

const routes: Routes = [
  {path:"" , component:LoginComponent},
  {path: "admin-home", component: AdminHomeComponent},
  {path: "admin-upload", component: AdminUploadComponent},
  {path: "admin-info", component: AdminFileINFOComponent},
  {path: "admin-data", component: AdminDataComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
