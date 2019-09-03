import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment.prod';
import { Orgao } from '../models/orgao';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class SegrestService extends BaseService {

  constructor() {
    super(environment.URL_REGREST);
   }

   public getOrgaos(): Observable<Orgao[]> {
    return this.searchList('orgaos');
   }
}
