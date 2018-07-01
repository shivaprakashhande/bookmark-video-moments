import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorhandlerService } from './errorhandler.service';
import 'rxjs/add/operator/do';

@Injectable()
export class InterceptorService {

  constructor(  public errorHandler: ErrorhandlerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
    });
    return next.handle(request).do((event: HttpEvent<any>) => { }, (err: any) => {
      this.errorHandler.handleError(err);
    });
  }
}
