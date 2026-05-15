import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NoContent } from './no-content.type';

export abstract class ApiBaseService {
  protected readonly http = inject(HttpClient);

  /**
   * Realiza una solicitud GET a un endpoint y transforma la respuesta.
   *
   * @param endpoint Endpoint al que se realizará la solicitud.
   * @param mapper Función opcional para transformar la respuesta.
   * @returns Un observable con la respuesta transformada.
   */
  protected get<TResponse>(
    endpoint = '',
    mapper?: (data: TResponse) => TResponse,
  ): Observable<TResponse> {
    return this.http
      .get<TResponse>(endpoint)
      .pipe(map((response) => this.handleResponse(response, mapper)));
  }

  /**
   * Realiza una solicitud POST a un endpoint y transforma la respuesta.
   *
   * @param request Datos del cuerpo de la solicitud.
   * @param endpoint Endpoint al que se realizará la solicitud.
   * @param mapper Función opcional para transformar la respuesta.
   * @returns Un observable con la respuesta transformada.
   */
  protected post<TRequest, TResponse>(
    request: TRequest,
    endpoint = '',
    mapper?: (data: TResponse) => TResponse,
  ): Observable<TResponse> {
    return this.http
      .post<TResponse>(endpoint, request)
      .pipe(map((response) => this.handleResponse(response, mapper)));
  }

  /**
   * Realiza una solicitud PUT a un endpoint y transforma la respuesta.
   *
   * @param request Datos del cuerpo de la solicitud.
   * @param endpoint Endpoint al que se realizará la solicitud.
   * @param mapper Función opcional para transformar la respuesta.
   * @returns Un observable con la respuesta transformada.
   */
  protected put<TRequest, TResponse>(
    request: TRequest,
    endpoint = '',
    mapper?: (data: TResponse) => TResponse,
  ): Observable<TResponse | NoContent> {
    return this.http.put<TResponse>(endpoint, request, { observe: 'response' }).pipe(
      map((response) => {
        return this.handleNoContentResponse(response, mapper);
      }),
    );
  }

  /**
   * Realiza una solicitud DELETE a un endpoint y transforma la respuesta.
   *
   * @param endpoint Endpoint al que se realizará la solicitud.
   * @param mapper Función opcional para transformar la respuesta.
   * @returns Un observable con la respuesta transformada.
   */
  protected delete<TResponse>(
    endpoint = '',
    mapper?: (data: TResponse) => TResponse,
  ): Observable<TResponse | NoContent> {
    return this.http
      .delete<TResponse>(endpoint, { observe: 'response' })
      .pipe(map((response) => this.handleNoContentResponse(response, mapper)));
  }

  /**
   * Maneja la respuesta de la API y aplica un mapeador opcional.
   *
   * @param response Respuesta de la API.
   * @param mapper Función opcional para transformar la respuesta.
   * @returns La respuesta transformada o el valor original.
   */
  private handleResponse<TResponse>(
    response: TResponse,
    mapper?: (data: TResponse) => TResponse,
  ): TResponse {
    return mapper ? mapper(response) : response;
  }

  /**
   * Maneja la respuesta de la API cuando no hay contenido.
   * @param response Respuesta de la API.
   * @param mapper Función opcional para transformar la respuesta.
   * @returns La respuesta transformada o un valor nulo.
   */
  private handleNoContentResponse<TResponse>(
    response: HttpResponse<TResponse>,
    mapper?: (data: TResponse) => TResponse,
  ): TResponse | NoContent {
    if (response.status === HttpStatusCode.NoContent) {
      return null;
    }

    return response.body ? this.handleResponse(response.body, mapper) : null;
  }
}
