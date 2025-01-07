import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  standalone: false,

  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent implements OnInit {
  data :any;
  constructor(private route : ActivatedRoute){}
  
  ngOnInit(): void {
    this.route.data.subscribe(({dataResolve}) => {
      this.data = dataResolve;
      console.log(this.data);
    });
  }
}
