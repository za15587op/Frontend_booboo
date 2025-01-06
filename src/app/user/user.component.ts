import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: false,
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  isSidebarOpen = true;
  currentMessage = '';
  messages: { text: string; isUser: boolean }[] = [];

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
}