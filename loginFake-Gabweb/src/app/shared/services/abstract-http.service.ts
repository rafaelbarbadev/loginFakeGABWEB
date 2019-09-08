import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbstractHttpService<T> {
  private readonly APPLICATION_JSON_UTF_8 = 'application/json;charset=UTF-8';
  private root: string;
  constructor(private http: HttpClient, 
  root: string,
  initialPath?: string, ) {
    initialPath = initialPath != null && initialPath !== '' ? `/${initialPath}` : '';
    this.root = `${root}${initialPath}`;
  }

  protected searchList(path?: string, params?: Object): Observable<T[]>{
    return this.http.get(`${this.root}/${path}`, this.createOptions(params))
    .pipe(
        map((next) => this.handleResult(next))
    );
  }

  protected get(path?: string, params?: Object): Observable<T> {
    return this.http.get(`${this.root}/${path}`, this.createOptions(params))
    .pipe(
      map((next) => this.handleResult(next))
    );
  }

  protected post(path?: string, body?: any, params?: Object): Observable<any> {
    return this.http.post(`${this.root}/${path}`, body, this.createOptions(params))
    .pipe(
      map((next) => this.handleResult(next))
    );
  }

  protected put(path?: string, body?: any, params?: Object): Observable<any> {
    return this.http.put(`${this.root}/${path}`, body, this.createOptions(params))
    .pipe(
      map((next) => this.handleResult(next))
    );
  }

  protected delete(path?: string, params?: Object): Observable<T> {
    return this.http.delete(`${this.root}/${path}`, this.createOptions(params))
    .pipe(
      map( (next) => this.handleResult(next))
    );
  }

  protected head(path?: string, body?: any, params?: Object): Observable<any> {
    return this.http.head(`${this.root}/${path}`, this.createOptions(params))
    .pipe(
      map( (next) => this.handleResult(next))
    );
  }

  private handleResult(result: any): any {
    let res = {};
    if (this.isJsonString(result)) {
      res = result.json();
    } else if (result.text()) {
      const resultFormatted = result.text() === 'true' || result.text() === 'false' ?
      Boolean(JSON.parse(result.text())) : result.text();
      res = resultFormatted;
    }
    return res;
  }

  private createOptions(params?: Object): any {
    const httpParams = new HttpParams();
    const paramsMap = params != null ? Object.entries(params).forEach(x => httpParams.append(x[0], x[1])) : null;
    return {
      headers: new HttpHeaders({
        'Content-Type':  this.APPLICATION_JSON_UTF_8,
        'accept': this.APPLICATION_JSON_UTF_8,
        'Authorization': ''
      }),
      params: paramsMap,
      observe: 'response',
      responseType: 'json',
      reportProgress: false,
      withCredentials: false,
    }
  }

  private isJsonString(resposta: any): boolean {
    try {
        const formattedResponse = JSON.parse(resposta.text());
        if (formattedResponse && typeof formattedResponse === 'object') {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
  }

}
