import { Component,inject, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TraderListService } from '../trader-list.service';
import { Trader } from '../trader';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { DepositFundsComponent } from '../deposit-funds/deposit-funds.component';
import { WithdrawFundsComponent } from '../withdraw-funds/withdraw-funds.component';

import { Observable, interval, timer} from 'rxjs';

@Component({
  selector: 'app-trader-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trader-account.component.html',
  styleUrl: './trader-account.component.css'
})
export class TraderAccountComponent implements OnInit, OnChanges {

  route :ActivatedRoute = inject(ActivatedRoute)
  _traderList: TraderListService = inject(TraderListService);
  trader: Trader = {
    key: "0",
    id: 0,
    firstName: '',
    lastName: '',
    dob:"string",
    country:"string",
    email:"string",
    actions:"string",
    amount:0
    
  };
  traderId: number = 0;
  trader$ = new Observable<Trader>;
 

  constructor(public dialog:MatDialog){}

  ngOnInit(): void{
    console.log('ngOnInit triggered');

    this.route.params.subscribe( (data:Params) => {

      this.traderId = data['id']
      console.log("this.traderId: ", this.traderId)
     

      this.trader$ = this._traderList.getTraderById(this.traderId)

      console.log("this.trader$:",this.trader$)

      this._traderList.getTraderById(this.traderId).subscribe(data => {
        console.log(data)

      })
      
     
    })

    
  }

  ngOnChanges(): void{
    console.log('ngOnChanges triggered');

    this.route.params.subscribe((data: Params) => {
      this.traderId = data['id'];
      this.trader$ = this._traderList.getTraderById(this.traderId);
    });

  }

  
  openDialogDeposit(){
    console.log("dsfsfds")
    const dialogRef= this.dialog.open(DepositFundsComponent);
    

    dialogRef.afterClosed().subscribe((amount: number)  => {
      console.log(amount,"amount")

      this.trader$ = this._traderList.depositFunds(this.traderId,amount)
      this._traderList.depositFunds(this.traderId,amount).subscribe(data =>{
        console.log("data: ",data)

      });
        console.log("this.trader$: ",this.trader$)

    });

  }


  openDialogWithdraw(){
    
    const dialogRef= this.dialog.open(WithdrawFundsComponent);
    
    dialogRef.afterClosed().subscribe((amount: number)  => {
      this.trader$=this._traderList.withdrawFunds(this.traderId,amount)
      console.log("this.trader$: ",this.trader$)

  });

  }

}
