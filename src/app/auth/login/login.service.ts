import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  userId: string | null = null;
  clientId = 'Ov23liifej93fi64Be7x';
  redirectUri = 'http://localhost:4200/auth/callback';
  backendUrl = 'http://localhost:5000';

  addUser(data:any){
    return this.http.post("http://127.0.0.1:5000/api/user",data)
  }

  getUser(){
    return this.http.get("http://127.0.0.1:5000/api/showUsers")
  }

  loginWithGitHub() {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}`;
    window.location.href = authUrl;
  }

  exchangeCodeForToken(code: string) {
    return this.http.post(`${this.backendUrl}/authenticate`, { code });
  }

}
