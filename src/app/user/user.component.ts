import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../component/navbar/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: false,

  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  isSidebarOpen = true;
  currentMessage = '';
  messages: { text: string; isUser: boolean }[] = [];
  role:any
  buttonAdmin: boolean = true;

  constructor(private sv:NavbarService, private router:Router){}

  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      this.sv.getByUser(user_id).subscribe((res: any) => {
        console.log(res);
        this.role = res.user_role;
        console.log(this.role);

        if (this.role == 'Admin') {
          this.buttonAdmin = true;
        } else {
          this.buttonAdmin = false;
        }
      });
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  sendMessage() {
    if (this.currentMessage.trim()) {
      this.messages.push({ text: this.currentMessage, isUser: true });
      this.currentMessage = '';
      setTimeout(() => {
        this.messages.push({
          text: 'ขอบคุณที่ส่งข้อความมา! มีอะไรให้ช่วยมั้ย?',
          isUser: false,
        });
      }, 1000);
    }
  }

  homeadmin(){
    this.router.navigate(['admin']);
  }


}
