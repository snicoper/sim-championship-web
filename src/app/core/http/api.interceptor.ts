import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { LocaleService } from '../localization/locale.service';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith('http')) {
    return next(request);
  }

  const authService = inject(AuthService);
  const localeService = inject(LocaleService);

  const token = authService.getToken();
  const locale = localeService.value() ?? 'en';

  let headers = request.headers;

  if (token && !headers.has('Authorization')) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  headers = headers.set('Accept-Language', locale).set('Content-Language', locale);

  request = request.clone({ headers });

  return next(request);
};
