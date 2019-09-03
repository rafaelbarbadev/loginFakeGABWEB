import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorInterceptor } from './services/http-error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
