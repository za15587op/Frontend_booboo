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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.Name = params['name'] || 'Admin'; // ค่า default เป็น 'Admin'
      this.Role = params['role'] || 'Unknown Role'; // ค่า default เป็น 'Unknown Role'
      console.log('ชื่อผู้ดูแลระบบ:', this.Name);
      console.log('Role ผู้ใช้งาน:', this.Role);
    });
  }
}
