import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { fromApiDateTime } from '../../../core/date-time/date-time.utils';
import { ApiBaseService } from '../../../core/http/api-base.service';
import { ApiUrls } from '../../../core/navigation/api-urls';
import { buildApiUrl } from '../../../core/navigation/url.utils';
import { LoginRequest } from '../contracts/requests/login.request';
import { LoginResponse } from '../contracts/responses/login.response';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends ApiBaseService {
  login(request: LoginRequest): Observable<LoginResponse> {
    const endpoint = buildApiUrl(ApiUrls.auth.login);

    return this.post<LoginRequest, LoginResponse>(request, endpoint, (response) => ({
      ...response,
      expires: fromApiDateTime(response.expiresIn) as DateTime,
    }));
  }
}
