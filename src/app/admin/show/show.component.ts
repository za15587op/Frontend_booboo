import { Component } from '@angular/core';
import { ShowService } from './show.service';

@Component({
  selector: 'app-show',
  standalone: false,

  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent {
  dataFile:any;
  constructor(private sv:ShowService){}

  ngOnInit(): void {
    const user_id = sessionStorage.getItem('user_id');
    console.log(user_id);

    if (user_id) {
      this.sv.getDataFile(user_id).subscribe((res) => {
        this.dataFile = res;
        console.log(this.dataFile);
      });
    } else {
      console.log("User ID not found in session storage");
    }
  }
}
