import { Component,inject} from '@angular/core';
import { Trader } from '../trader';
import { TraderListService } from '../trader-list.service';
import {MatTableDataSource, MatTableModule,} from '@angular/material/table';
import { Observable, of} from 'rxjs';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { AddTraderComponent } from '../add-trader/add-trader.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trader-list',
  standalone: true,
  imports: [MatTableModule,MatDialogModule,RouterModule,CommonModule],
  templateUrl: './trader-list.component.html',
  styleUrl: './trader-list.component.css'
})
export class TraderListComponent{

  traderListService: TraderListService = inject(TraderListService);
  route :ActivatedRoute = inject(ActivatedRoute)

  dataSource : MatTableDataSource<Trader> = new MatTableDataSource<Trader>(); 

  constructor(public dialog:MatDialog) {}

  ngOnInit(){

    // this.traderList= this.traderListService.getDataSource()

    this.traderListService.getDataSource().subscribe(data => {
      
      this.dataSource.data = data
    
    },(error) =>{
      console.error('Error fetching data:', error);
    

    });
  

  }

  deleteTrader(event:Event,id:number): void{
    console.log("ID", id)
    try{
      this.traderListService.deleteTrader(id).subscribe(updatedList => {

        this.dataSource.data = updatedList;
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
          this.traderListService.addTrader(result).subscribe((data) => {
            this.dataSource.data = data;
          })
    
          console.log('Trader added:', result);
          
        } else {
          // Handle case where the user  canceled the dialog
          console.log('Dialog was closed without adding a trader');
        }
      });

    }


}
