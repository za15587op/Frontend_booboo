import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashBoardComponent } from './admin/dashboard/dashboard.component';
import { UploadFileComponent } from './admin/uploadfile/uploadfile.component';
import { AdminFileINFOComponent } from './admin/admin-file-info/admin-file-info.component';

import { UserComponent } from './user/user.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { DataStoredComponent } from './admin/data-stored/data-stored.component';
import { getDataFileResolve } from './admin/data-stored/data-stored.resolver';
import { LoginGuard } from './auth/login/login.guard';


const routes: Routes = [
  {path:"" , component:LoginComponent},
  {path:"navbar", component:NavbarComponent },
  {path: "admin/dashboard", component: DashBoardComponent , canActivate : [LoginGuard] },
  {path: "admin/uploadfile", component: UploadFileComponent, canActivate : [LoginGuard]},
  {path: "admin-info", component: AdminFileINFOComponent},
  {path: "admin/DataStored", component: DataStoredComponent, resolve :{getDataFileResolve}, canActivate : [LoginGuard]},
  {path: "user", component: UserComponent, canActivate : [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
