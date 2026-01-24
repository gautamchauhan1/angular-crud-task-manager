import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  //instead of constructor, we inject service and router using 'inject'

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedIn())
  {
      return true;
  } else {
    alert('Access denied! please login first.');
    router.navigate(['/login']);
    return false;
  }

};
