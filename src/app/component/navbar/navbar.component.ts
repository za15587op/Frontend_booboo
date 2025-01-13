import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { LoginService } from '../../auth/login/login.service';
import { firstValueFrom } from 'rxjs';
import { NavbarService } from './navbar.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun} from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

    bars = faBars;
    sun = faSun;
    moon = faMoon;
    state : boolean = false;
    data:any = {};
    user: any;
    isLoading = false;
    inProgress = false;
    loggedIn: any;
    user_id:any;

    constructor(
      private socialAuthService: SocialAuthService,
      private msalService: MsalService,
      private sv: NavbarService,
      private router:Router
    ) {}


    @Output() stateSidebar : EventEmitter<boolean> = new EventEmitter(false);

    toggleSidebar(){
      this.state = !this.state;
      this.stateSidebar.emit(this.state)
    }


    ngOnInit(): void {
      const user_id = localStorage.getItem('user_id');
      console.log(user_id,"dsaa");

      if (user_id) {
        this.sv.getByUser(user_id).subscribe((res) =>{
          this.data = res
        });
      }
    }

  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('accessToken');

    if (this.msalService.instance.getActiveAccount()) {
      firstValueFrom(this.msalService.logout());
    }

    if (this.user) {
      this.socialAuthService.signOut();
    }

    this.user = null;
    this.msalService.instance.clearCache();
    this.router.navigate(['']);
  }
}
