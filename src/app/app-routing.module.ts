import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashBoardComponent } from './admin/dashboard/dashboard.component';
import { UploadFileComponent } from './admin/uploadfile/uploadfile.component';
import { AdminFileINFOComponent } from './admin/admin-file-info/admin-file-info.component';
import { ShowComponent } from './admin/show/show.component';
import { UserComponent } from './user/user.component';
import {AuthGuard } from './auth/login/auth.guard';
import { NavbarComponent } from './component/navbar/navbar.component';
import { dataResolve } from './admin/show/data.resolver';

const routes: Routes = [
  {path:"" , component:LoginComponent},
  {path:"navbar", component:NavbarComponent },
  {path: "admin/dashboard", component: DashBoardComponent },
  {path: "admin/uploadfile", component: UploadFileComponent},
  {path: "admin-info", component: AdminFileINFOComponent},
  {path: "admin/show", component: ShowComponent, resolve:{dataResolve}},
  {path: "user", component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
