import { Component } from '@angular/core';
import { TraderListComponent } from '../trader-list/trader-list.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TraderListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
