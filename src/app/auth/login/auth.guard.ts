import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const userRole = localStorage.getItem('userRole'); // รับ Role จาก LocalStorage

    if (userRole == 'Admin') {
      return true; // อนุญาตให้เข้าถึง
    } 
    else{
      this.router.navigate(['']); // หากไม่มีสิทธิ์เข้าถึง
    return false;
    }
  }
}