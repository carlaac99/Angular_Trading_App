import { Component,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TraderListService } from '../trader-list.service';
import { Trader } from '../trader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trader-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trader-account.component.html',
  styleUrl: './trader-account.component.css'
})
export class TraderAccountComponent {
  route :ActivatedRoute = inject(ActivatedRoute)
  traderList: TraderListService = inject(TraderListService);
  trader: Trader | undefined;

  constructor(){
    const traderId= Number(this.route.snapshot.params['id'])
    console.log("trader id", traderId)
    this.trader= this.traderList?.getTraderById(traderId)
    // console.log(this.trader)


  }


}
