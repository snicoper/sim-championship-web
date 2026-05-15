import { DateTime } from 'luxon';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: DateTime;
}
