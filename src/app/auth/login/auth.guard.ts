import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const userRole = sessionStorage.getItem('userRole');

    if (userRole === 'admin') {
      return true;
    }
    else{
      this.router.navigate(['']);
    return false;
    }
  }
}
