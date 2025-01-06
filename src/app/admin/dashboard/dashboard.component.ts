import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashBoardComponent implements OnInit {

  user_id:string = '';
  constructor(private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
      this.route.data.subscribe(({getUserId}) =>{
        this.user_id = getUserId
        console.log(this.user_id,"user_id");
      })
  }

}
