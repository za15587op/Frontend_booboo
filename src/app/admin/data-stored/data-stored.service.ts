import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStoredService {
 constructor(private http : HttpClient) { }

   getDataFiles(){
     return this.http.get("http://127.0.0.1:5000/api/getDataFile")
   }
   deldataflie(fileId : string){
    return this.http.delete(`http://127.0.0.1:5000/api/file/${fileId}`)
   }

   downloadflie(fileId : string){
    return this.http.get(`http://127.0.0.1:5000/api/downloadFile/${fileId}`,{
      responseType: 'blob' })
    
   }
}
 
