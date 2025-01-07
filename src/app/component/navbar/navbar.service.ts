import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http:HttpClient) { }

  getByUser(data:any){
    console.log("User ID:", data);
    return this.http.post(`http://127.0.0.1:5000/api/getByUser`,data);
  }

}
