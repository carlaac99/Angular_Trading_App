import { Component,inject } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Quote } from '../quote';
import { CommonModule } from '@angular/common';
import { QuotesService } from '../quotes.service';


@Component({
  selector: 'app-quotes-list',
  standalone: true,
  imports: [ MatTableModule, CommonModule],
  templateUrl: './quotes-list.component.html',
  styleUrl: './quotes-list.component.css'
})
export class QuotesListComponent {
  quotesServices: QuotesService = inject(QuotesService);
  dataSource : MatTableDataSource<Quote> = new MatTableDataSource<Quote>(); 
  tickets : Quote[] = [];
  constructor(){}

  ngOnInit(){
    this.quotesServices.getQuote("AAPL").subscribe(ticker =>{
      this.tickets.push(ticker)
      this.dataSource.data = this.tickets;
    })
  }


}
