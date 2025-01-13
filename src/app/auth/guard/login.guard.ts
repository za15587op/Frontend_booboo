import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { NavbarService } from '../../component/navbar/navbar.service';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  data: any;
  constructor(private router: Router, private sv: NavbarService) {}

  canActivate(): Observable<boolean> {
    const user_id = localStorage.getItem('user_id');

    if (!user_id) {
      this.router.navigate(['']);
      return of(false);
    }

    return this.sv.getByUser(user_id).pipe(
      map((res) => {
        this.data = res;
        if (this.data.user_role == 'Admin' || this.data.user_role == 'User') {
          return true;
        }
        this.router.navigate(['']);
        return false;
      })
    );
  }
}
