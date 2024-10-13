import { Injectable } from '@angular/core';
import { Trader } from './trader';
import {  Observable,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TraderListService {
  private SERVER_URL: string = 'http://localhost:4100/'

  constructor(private http: HttpClient){}
  
  trader: Trader | undefined;

  // traders: Trader[] ;

  getDataSource(): Observable<Trader[]>{
    console.log("Making API call to get traders...");

    return this.http.get<Trader[]>(this.SERVER_URL)
  }

  getColumns(): string[]{
    return ['First Name', 'Last Name',"Email",'DateOfBirth','Country','Actions']
  }

  deleteTrader(id:number): Observable<Trader []>{

    this.traders= this.traders.filter(trader => trader.id!==id)

    const updatedTraders = of(this.traders);

    return updatedTraders;
  }

  addTrader(trader:Trader): Observable<Trader []>{

    trader.id = this.traders.length + 1;

    trader.key = trader.id.toString();

    this.traders.push(trader)

    const updatedTraders = of(this.traders);

    return updatedTraders
  }

  getTraderById(id: number):  Observable<Trader[]> {



    // this.trader = this.traders.find(trader => trader.id === id);
      
    // if (this.trader !== undefined) {

    //   console.log("Found match:", this.trader);

    //   return this.trader;
    // } else {

    //   console.log("No match found");

    //   return undefined;
    // }

    return this.http.get<Trader[]>(this.SERVER_URL + )
  }

  depositFunds(id: number,amount:number): Trader | undefined {

    var trader;
    for (let i=0; i <this.traders.length;i++){
        
      if (this.traders[i].id === id){

        this.traders[i].amount+=amount

        console.log("amount:",this.traders[i].amount)

        trader= this.traders[i]

        break;
      }
    }
    return trader;

  }

  withdrawFunds(id: number,amount:number): Trader | undefined {

    var trader;
    for (let i=0; i <this.traders.length;i++){
        
      if (this.traders[i].id === id){

        this.traders[i].amount-=amount

        console.log("amount:",this.traders[i].amount)

        trader= this.traders[i]

        break;
      }
    }
    return trader;

  }

  
}
