import { Injectable } from '@angular/core';
import { AbstractHttpService } from './abstract-http.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GabwebServiceService extends AbstractHttpService<any> {

  constructor(http: HttpClient) {
    super(http, environment.URL_GABINETEWEB);
  }

  public gerarSessao(): void {
    this.get('orgao');
  }
}
