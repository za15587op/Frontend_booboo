import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashBoardComponent } from './admin/dashboard/dashboard.component';
import { UploadFileComponent } from './admin/uploadfile/uploadfile.component';
import { AdminFileINFOComponent } from './admin/admin-file-info/admin-file-info.component';
import { ShowComponent } from './admin/show/show.component';
import { getUserId } from './admin/dashboard/dashborad.resolver';
import { uploadFile } from './admin/uploadfile/uploadfile.resolver';
import { UserComponent } from './user/user.component';
import {AuthGuard } from './auth/login/auth.guard';

const routes: Routes = [
  {path:"" , component:LoginComponent},
  {path: "admin/dashboard", component: DashBoardComponent, resolve:{getUserId} , canActivate : [AuthGuard] },
  {path: "admin/uploadfile", component: UploadFileComponent, resolve:{uploadFile} ,canActivate : [AuthGuard]},
  {path: "admin-info", component: AdminFileINFOComponent,canActivate : [AuthGuard]},
  {path: "admin/show", component: ShowComponent,canActivate : [AuthGuard]},
  {path: "user", component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
