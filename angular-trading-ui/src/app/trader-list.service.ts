import { Injectable } from '@angular/core';
import { Trader } from './trader';
import {  Observable,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraderListService {
  private SERVER_URL: string = 'http://localhost:4100/'

  constructor(private http: HttpClient){}
  
  trader: Trader | undefined;


  getDataSource(): Observable<Trader[]>{
    console.log("Making API call to get traders...");

    return this.http.get<Trader[]>(this.SERVER_URL)
  }

  getColumns(): string[]{
    return ['First Name', 'Last Name',"Email",'DateOfBirth','Country','Actions']
  }

  deleteTrader(id:number): Observable<Trader []>{

    return this.http.delete<Trader[]>(this.SERVER_URL + "delete/" + id);
  }

  addTrader(trader:Trader): Observable<Trader[]>{


    return this.http.post<Trader[]>(this.SERVER_URL + "addTrader" ,{trader});
  }

  getTraderById(id: number): Observable<Trader> {

    return this.http.get<Trader>(`${this.SERVER_URL}${id}`)
  }

  depositFunds(id: number,amount:number):  Observable<Trader> {

    return this.http.post<Trader>(this.SERVER_URL + "deposit/"+ id + "/" + Number(amount)  , {});

  }

  withdrawFunds(id: number,amount:number):  Observable<Trader> {

    return this.http.post<Trader>(this.SERVER_URL + "withdraw/"+ id + "/" + Number(amount) , {});

  }
}
