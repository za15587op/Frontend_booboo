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
import { LoginGuard } from './auth/guard/login.guard';
import { UserManageComponent } from './admin/user-manage/user-manage.component';
import { AdminGuard } from './auth/guard/admin.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'auth/callback', component: LoginComponent },
  {
    path: '',
    canActivateChild: [AdminGuard],
    children: [
      { path: 'admin', component: DashBoardComponent },
      { path: 'admin/uploadfile', component: UploadFileComponent },
      {
        path: 'admin/datastored',
        component: DataStoredComponent,
        resolve: { getDataFileResolve },
      },
      { path: 'admin/UserManage', component: UserManageComponent },
      { path: 'admin/user', component: UserComponent },
    ],
  },
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
