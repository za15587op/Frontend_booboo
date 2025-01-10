import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  constructor(private http:HttpClient) { }

  updateRole(user_id: string, user: any) {
    return this.http.put(`http://127.0.0.1:5000/api/UpdateRole/${user_id}`, user);
  }

}
