import { Component,inject } from '@angular/core';
import { Trader } from '../trader';
import { TraderListService } from '../trader-list.service';
import {MatTableDataSource, MatTableModule,} from '@angular/material/table';
import { Observable, of} from 'rxjs';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { AddTraderComponent } from '../add-trader/add-trader.component';

import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-trader-list',
  standalone: true,
  imports: [MatTableModule,MatDialogModule,RouterModule],
  templateUrl: './trader-list.component.html',
  styleUrl: './trader-list.component.css'
})
export class TraderListComponent {
  traderList: Observable<Trader[]>=of([]);
  traderListService: TraderListService = inject(TraderListService)
  dataSource=new MatTableDataSource<Trader>();
  constructor(private _traderList:TraderListService,public dialog:MatDialog) {
    console.log("in tradelist component constructor")

  
    this.traderList= this.traderListService.getDataSource()

    this.traderList.subscribe(data => {
      this.dataSource.data = data;  // Assign the data to the table's data source
    });
  }

  deleteTrader(event:Event,id:number): void{
    console.log("ID", id)
    try{
      this._traderList.deleteTrader(id).subscribe(updatedList => {
        this.dataSource.data= updatedList;
      })
    } catch (err){
      console.log(err)
    }
  }

  openDialog():void{
    console.log('Dialog should open');

      const dialogRef= this.dialog.open(AddTraderComponent);

      dialogRef.afterClosed().subscribe((result: Trader | null) => {
        
        if (result!=null) {
          // Add the new trader to the traders list if the dialog returned a valid result
          this._traderList.addTrader(result).subscribe(updatedListItem =>{
            this.dataSource.data= updatedListItem;
          })

    
          console.log('Trader added:', result);
        } else {
          // Handle case where the user canceled the dialog
          console.log('Dialog was closed without adding a trader');
        }
      });

    }


}
