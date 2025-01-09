import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashBoardComponent implements OnInit {
  Name: string | null = null;
  Role: string | null = null;

  constructor() {}

  ngOnInit(): void {
    const state = history.state;
    if (state) {
      this.Name = state.name || 'Admin';
      this.Role = state.role || 'Unknown Role';
      console.log('ชื่อผู้ดูแลระบบ:', this.Name);
      console.log('Role ผู้ใช้งาน:', this.Role);
    }
  }
}