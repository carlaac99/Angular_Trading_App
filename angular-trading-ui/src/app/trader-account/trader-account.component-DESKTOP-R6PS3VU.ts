import { Component,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TraderListService } from '../trader-list.service';
import { Trader } from '../trader';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { DepositFundsComponent } from '../deposit-funds/deposit-funds.component';
import { WithdrawFundsComponent } from '../withdraw-funds/withdraw-funds.component';
@Component({
  selector: 'app-trader-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trader-account.component.html',
  styleUrl: './trader-account.component.css'
})
export class TraderAccountComponent {
  route :ActivatedRoute = inject(ActivatedRoute)
  _traderList: TraderListService = inject(TraderListService);
  trader: Trader | undefined;
  traderId: number;

  constructor(public dialog:MatDialog){

    this.traderId= Number(this.route.snapshot.params['id'])

    console.log("trader id", this.traderId)

    this.trader= this._traderList?.getTraderById(this.traderId)
    // console.log(this.trader)


  }
  openDialogDeposit(){

    const dialogRef= this.dialog.open(DepositFundsComponent);

    dialogRef.afterClosed().subscribe((amount: number)  => {
        this.trader=this._traderList.depositFunds(this.traderId,amount)

    });

  }


  openDialogWithdraw(){
    
    const dialogRef= this.dialog.open(WithdrawFundsComponent);
    
    dialogRef.afterClosed().subscribe((amount: number)  => {
      this.trader=this._traderList.withdrawFunds(this.traderId,amount)

  });

  }


}
