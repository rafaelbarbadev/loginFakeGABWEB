import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GabwebServiceService extends BaseService {

  constructor() {
    super(environment.URL_GABINETEWEB);
  }

  public gerarSessao(): void {
    this.get('orgao');
  }
}
