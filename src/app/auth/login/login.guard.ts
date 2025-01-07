import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const userRole = sessionStorage.getItem('userRole');

    if (userRole == 'Admin') {
      sessionStorage.removeItem('userRole')
      return true;
    }
    else{
      this.router.navigate(['']);
      sessionStorage.removeItem('userRole')
    return false;
    }
  }
}
