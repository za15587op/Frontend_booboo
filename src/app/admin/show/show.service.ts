import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private http:HttpClient) { }

  getdata(){
    return this.http.get("http://127.0.0.1:5000/api/data")
  }
}
