import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  userId: string | null = null;
  private clientIdGitHub = 'Ov23liifej93fi64Be7x';
  private redirectUriGitHub = 'http://localhost:4200/auth/callback';
  private backendUrlGitHub = 'http://localhost:5000';

  addUser(data:any){
    return this.http.post("http://127.0.0.1:5000/api/user",data)
  }

  getUser(){
    return this.http.get("http://127.0.0.1:5000/api/showUsers")
  }

  loginWithGitHub() {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientIdGitHub}&redirect_uri=${this.redirectUriGitHub}&scope=repo user offline_access`;
    window.location.href = authUrl;
  }


  exchangeCodeForToken(code: string) {
    return this.http.post(`${this.backendUrlGitHub}/authenticate`, { code });
  }

}
