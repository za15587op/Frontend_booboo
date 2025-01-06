import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LoginService } from '../../auth/login/login.service';

export const uploadFile: ResolveFn<any> = () => {
  return inject(LoginService).getUserId();
};
