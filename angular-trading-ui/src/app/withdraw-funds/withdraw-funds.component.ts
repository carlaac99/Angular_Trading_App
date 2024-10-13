import { Component, inject } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-withdraw-funds',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './withdraw-funds.component.html',
  styleUrl: './withdraw-funds.component.css'
})
export class WithdrawFundsComponent {
  readonly dialogRef = inject(MatDialogRef<WithdrawFundsComponent>)

  withdrawForm= new FormGroup({
    amount : new FormControl(0)
  });

  submitWithdrawl(){
    this.dialogRef.close(this.withdrawForm.get("amount")?.value)
  }

  onCancel(){
    this.dialogRef.close(0)
  }

}
