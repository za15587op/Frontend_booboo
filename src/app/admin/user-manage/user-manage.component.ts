import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserManageService } from './user-manage.service';

@Component({
  selector: 'app-user-manage',
  standalone: false,

  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.scss'
})
export class UserManageComponent implements OnInit {
  UserAll: any[] = []
  user_id:string = ''
  form!:FormGroup
  searchText:string = ''
  constructor(private sv:LoginService, private fb:FormBuilder, private sv2:UserManageService){}

  ngOnInit(): void {
    this.getDataUser();
    this.createForm();

    if(this.UserAll){
      this.form.patchValue(this.UserAll);
    }
  }

  createForm() {
    this.form = this.fb.group({
      user_id:null ,
      name:null ,
      username:null ,
      user_role:null
    });
  }

  ChangeRole(user_id: string, user_role: string) {
    console.log(`User ID: ${user_id}, Selected Role: ${user_role}`);
    const data = {
      user_role: user_role
    };
    this.sv2.updateRole(user_id,data).subscribe((res)=>{
      console.log(res);
      this.getDataUser();
    })
  }

  getDataUser() {
    this.sv.getUser().subscribe((res: any) => {
      console.log(res);
      this.UserAll = res;
      this.form.patchValue(this.UserAll);
    });
  }

  Search(): any[] {
    console.log(this.searchText);
    return this.UserAll.filter((item: any) =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.username.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


}
