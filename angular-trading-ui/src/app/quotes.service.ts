import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Quote } from './quote';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private http:HttpClient) { }


  private SERVER_URL: string = 'http://localhost:4300/'
  getQuote(symbol:string): Observable<Quote>{
  


    return this.http.get<Quote>(this.SERVER_URL + "getQuote/" + symbol)

  }

}
