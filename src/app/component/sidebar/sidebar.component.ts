import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() state : boolean = false;
  isSidebarOpen: boolean = true;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
