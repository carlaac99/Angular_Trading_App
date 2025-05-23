import { Component,inject, OnInit } from '@angular/core';
import { Trader } from '../trader';
import { TraderListService } from '../trader-list.service';
import {MatTableDataSource, MatTableModule,} from '@angular/material/table';
import { Observable, of} from 'rxjs';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { AddTraderComponent } from '../add-trader/add-trader.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-trader-list',
  standalone: true,
  imports: [MatTableModule,MatDialogModule,RouterModule,CommonModule],
  templateUrl: './trader-list.component.html',
  styleUrl: './trader-list.component.css'
})
export class TraderListComponent{

  traderList: Observable<Trader[]>=of([]);

  traderListService: TraderListService = inject(TraderListService);

  dataSource : MatTableDataSource<Trader> = new MatTableDataSource<Trader>(); 

  loading = true;

  constructor(public dialog:MatDialog,private cdr: ChangeDetectorRef) {}

  ngOnInit(){
    this.traderList= this.traderListService.getDataSource()

    this.traderListService.getDataSource().subscribe(data => {
      this.dataSource = new MatTableDataSource<Trader>(data)
      this.cdr.detectChanges();
      

      // this.dataSource.data = data;  // Assign the data to the table's data source
      console.log("Data received in trader-list", data);  // Logs the received data
      console.log("Updated datasource in trader-list", this.dataSource.data);
      this.loading = false
     

    },(error) =>{
      console.error('Error fetching data:', error);
      this.loading = false; // Ensure loading is also set to false on error

    });
  

  }

  deleteTrader(event:Event,id:number): void{
    console.log("ID", id)
    try{
      this.traderListService.deleteTrader(id).subscribe(updatedList => {

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
          this.traderListService.addTrader(result).subscribe(updatedListItem =>{

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
