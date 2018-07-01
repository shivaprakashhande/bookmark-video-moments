import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable()
export class ErrorhandlerService {

  constructor(private injector: Injector) { }
  handleError(error: Error | HttpErrorResponse) {
    const router = this.injector.get(Router);
    router.navigate(['/error', { error: JSON.stringify(error) }]);
  }
}
