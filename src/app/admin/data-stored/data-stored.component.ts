import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-stored',
  standalone: false,
  
  templateUrl: './data-stored.component.html',
  styleUrl: './data-stored.component.scss'
})
export class DataStoredComponent implements OnInit {
data :any;
  constructor(private route : ActivatedRoute){}
  
  ngOnInit(): void {
    this.route.data.subscribe(({dataResolve}) => {
      this.data = dataResolve;
      console.log(this.data);
    });
  }
}

