// eslint-disable-next-line
declare const window: any;

// @see: https://pumpingco.de/blog/environment-variables-angular-docker/
export const environment = {
  production: false,
  siteName: window.env?.siteName || 'Virtual Racing Manager',
  apiUrl: window.env?.apiUrl || 'http://localhost:3000',
  siteUrl: window.env?.siteUrl || 'http://localhost:4200',
  apiSegment: window.env?.apiSegment || '',
  defaultLocale: window.env?.locale || 'es',
};
