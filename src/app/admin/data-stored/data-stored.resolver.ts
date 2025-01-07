import { ResolveFn } from '@angular/router';
import { DataStoredService } from './data-stored.service';
import { inject } from '@angular/core';

export const dataResolve: ResolveFn<any> = () => {
  return inject(DataStoredService).getdata();
}

