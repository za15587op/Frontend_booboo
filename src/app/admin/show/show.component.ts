import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { ActivatedRoute } from '@angular/router';
import { dataResolve } from './data.resolver';

@Component({
  selector: 'app-show',
  standalone: false,

  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent implements OnInit {
  data :any;
  constructor(private Route : ActivatedRoute) { }

  ngOnInit(): void {
    this.Route.data.subscribe(({dataResolve}) =>{
      this.data = dataResolve;
      console.log(this.data ,"data");
    })
  }
}
