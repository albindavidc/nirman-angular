import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const GuestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userJson = localStorage.getItem('user');

  if (userJson) {
    const user = JSON.parse(userJson);
    const role = user.role?.toLowerCase();

    let targetRoute = '/dashboard';
    if (role === 'admin') {
      targetRoute = '/vendor-management';
    } else if (role === 'supervisor') {
      targetRoute = '/dashboard/supervisor';
    } else if (role === 'vendor') {
      targetRoute = '/dashboard/vendor';
    } else if (role === 'worker') {
      targetRoute = '/dashboard/worker';
    }

    router.navigate([targetRoute]);
    return false;
  }

  return true;
};
