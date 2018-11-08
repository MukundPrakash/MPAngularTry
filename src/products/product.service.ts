import { Injectable } from "@angular/core";
import { IProducts } from "./products";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import{Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class ProductService{

  private productUrl='api/products/products.json';
  constructor(private http:HttpClient){

  }
    getProducts():Observable<IProducts[]>
    {
        return this.http.get<IProducts[]>(this.productUrl).pipe(
          tap(data=>console.log('All: '+ JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
    handleError(err:HttpErrorResponse){
      let errormessage='';
      if(err.error instanceof ErrorEvent)
      {
        //Client side or network error
        errormessage=err.error.message;
      }
      else{
        //the backend returned an unsuccessfuly response code
        //response body may contain clues as to what went wrong
        errormessage=err.status + err.message;
      }
      console.log(errormessage);
      return throwError(errormessage);
    }
}