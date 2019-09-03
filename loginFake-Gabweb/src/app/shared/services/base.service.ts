import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  
  constructor(private root: string,
    private http?: HttpClient, ) { }

  protected searchList<T>(path?: string, ...params: Array<any>): Observable<any>{

    return this.http.get(`${this.root}/${path}`, this.createOptions())
    .pipe(
      tap( (next) => this.handleResult(next),
            error => {} // this.handleError
      )
    );
  }

  protected get(path?: string, ...params: Array<any>): Observable<any> {
    return this.http.get(``, this.createOptions())
    .pipe(
      tap( (next) => this.handleResult(next),
          (error) => {} // this.handleError
      )
    );
  }

  private handleResult(result: HttpResponse<any>) {

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  private createOptions(...params: Array<any>): any {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'accept': 'application/json',
        // 'Authorization': 'my-auth-token'
      }),
      params: new HttpParams({

      }) ,
      observe: 'response',
      responseType: 'json',
      reportProgress: false,
      withCredentials: false,
    }
  }

}
