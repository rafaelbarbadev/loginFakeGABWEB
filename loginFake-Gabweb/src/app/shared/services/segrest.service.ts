import { Injectable } from '@angular/core';
import { AbstractHttpService } from './abstract-http.service';
import { environment } from 'src/environments/environment.prod';
import { Orgao } from '../models/orgao';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SegrestService extends AbstractHttpService<Orgao> {

  constructor(http: HttpClient) {
    super(http, environment.URL_REGREST);
   }

   public getOrgaos(): Observable<Orgao[]> {
    return this.searchList('orgaos');
   }
}
