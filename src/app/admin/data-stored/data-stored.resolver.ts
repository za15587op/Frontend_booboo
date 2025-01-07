import { ResolveFn } from '@angular/router';
import { DataStoredService } from './data-stored.service';
import { inject } from '@angular/core';

export const getDataFileResolve: ResolveFn<any> = () => {
  return inject(DataStoredService).getDataFiles();
}

