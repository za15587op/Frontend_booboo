import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private http:HttpClient) { }

  getDataFile(user_id:string){
    return this.http.get(`http://127.0.0.1:5000/api/getDataFile?user_id=${user_id}`)
  }

}
