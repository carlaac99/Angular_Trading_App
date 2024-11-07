import { CommonModule } from '@angular/common';
import { Component,inject } from '@angular/core';
import { ReactiveFormsModule,FormControl,FormGroup } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-deposit-funds',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './deposit-funds.component.html',
  styleUrl: './deposit-funds.component.css'
})
export class DepositFundsComponent {
  
  readonly dialogRef = inject(MatDialogRef<DepositFundsComponent>);

  depositForm = new FormGroup({
    amount: new FormControl(0)

  });
  submitDeposit(){
    console.log("submitDeposit")
    this.dialogRef.close(this.depositForm.get("amount")?.value)

  }
  onCancel(){
    console.log("onCancel")
    this.dialogRef.close(0)

  }

}
