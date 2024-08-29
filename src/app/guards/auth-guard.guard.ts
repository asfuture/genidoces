import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  const router = inject(Router);

  if (isAuthenticated === 'true') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
