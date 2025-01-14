import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http:HttpClient) { }

  getByUser(user_id:string){
    return this.http.get(`http://127.0.0.1:5000/api/getByUser?user_id=${user_id}`)
  }

}
