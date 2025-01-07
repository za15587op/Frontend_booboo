import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  private userId: string | null = null;

  addUser(data:any){
    return this.http.post("http://127.0.0.1:5000/api/user",data)
  }

  getUser(){
    return this.http.get("http://127.0.0.1:5000/api/showUsers")
  }
}
