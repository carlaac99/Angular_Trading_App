import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TraderAccountComponent } from './trader-account/trader-account.component';

export const routes: Routes = [
    {path:'dashboard', component:DashboardComponent},
    {path:'', component:DashboardComponent, pathMatch: 'full'},
    {path:'trader-account/:id', component:TraderAccountComponent,runGuardsAndResolvers: 'paramsOrQueryParamsChange'}

];
