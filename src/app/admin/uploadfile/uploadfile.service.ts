import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {

  constructor(private http:HttpClient) { }

  upload(mutiFile: FormData) {
    return this.http.post("http://127.0.0.1:5000/api/upload", mutiFile);
  }

}
