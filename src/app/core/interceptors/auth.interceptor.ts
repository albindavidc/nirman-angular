import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone request with credentials for cookie handling
  const authReq = req.clone({
    withCredentials: true,
  });

  return next(authReq);
};
