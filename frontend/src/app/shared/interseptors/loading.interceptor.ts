import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';


var pendeingRequests=0;


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService:LoadingService) {  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoading()
    pendeingRequests=pendeingRequests + 1

    return next.handle(request).pipe(
      tap({
        next:(event)=>{
          if(event.type===HttpEventType.Response){
            this.handelHideLoading()
          }
        },
        error: (_) =>{
          this.handelHideLoading()

        }
      })
    )
  }

  handelHideLoading(){
    pendeingRequests= pendeingRequests - 1
    if(pendeingRequests===0){
      this.loadingService.hideLoading()
    }
  }
}
