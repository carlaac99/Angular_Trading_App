import { Component, inject } from '@angular/core';
import {MatDialogModule, MatDialog,MatDialogRef} from '@angular/material/dialog';
import { Trader } from '../trader';
import { TraderListComponent } from '../trader-list/trader-list.component';
import { FormControl ,FormBuilder,ReactiveFormsModule,FormGroup} from '@angular/forms';



@Component({
  selector: 'app-add-trader',
  standalone: true,
  imports: [MatDialogModule,ReactiveFormsModule],
  templateUrl: './add-trader.component.html',
  styleUrl: './add-trader.component.css'
})
export class AddTraderComponent {
  traderForm: FormGroup;

  constructor( ){
    console.log('addtradercomponent loaded')
     this.traderForm= new FormGroup({
      firstName:new FormControl(""),
      lastName:new FormControl(""),
      email:new FormControl(""),
      country:new FormControl(""),
      dob:new FormControl("")
    })
  }

  readonly dialogRef = inject(MatDialogRef<AddTraderComponent>);


  onNoClick(): void{
    this.dialogRef.close(null)
  }

  onSubmit(): void{
    var trader: Trader =  {
      "key": "0",
      "id": 0,
      "firstName": this.traderForm.get('firstName')?.value,
      "lastName": this.traderForm.get('lastName')?.value,
      "dob": this.traderForm.get('dob')?.value,
      "country": this.traderForm.get('country')?.value,
      "email": this.traderForm.get('email')?.value,
      "actions": "<button (click)='deleteTrader'>Delete Trader</button>",
      "amount": 0
  }

    // this.traderListComponent.addTrader(trader)
    this.dialogRef.close(trader)

  }




}
