import { ResolveFn } from '@angular/router';

export const loginResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
