import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService } from './data.service';


export const dataResolve: ResolveFn<any> = () => {
  return inject(DataService).getdata();
}
