import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashBoardComponent } from './admin/dashboard/dashboard.component';
import { UploadFileComponent } from './admin/uploadfile/uploadfile.component';
import { AdminFileINFOComponent } from './admin/admin-file-info/admin-file-info.component';
import { ShowComponent } from './admin/show/show.component';
import { getUserId } from './admin/dashboard/dashborad.resolver';
import { uploadFile } from './admin/uploadfile/uploadfile.resolver';
import { NavbarComponent } from './component/navbar/navbar.component';

const routes: Routes = [
  {path:"" , component:LoginComponent},
  {path:"navbar", component:NavbarComponent},
  {path: "admin/dashboard", component: DashBoardComponent, resolve:{getUserId}},
  {path: "admin/uploadfile", component: UploadFileComponent, resolve:{uploadFile}},
  {path: "admin-info", component: AdminFileINFOComponent},
  {path: "admin/show", component: ShowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
