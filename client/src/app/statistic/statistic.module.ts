import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatsComponent } from './components/uses-stats/user-stats/user-stats.component';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ExpenseTableComponent } from './components/expense-table/expense-table.component';
import { MonthlyStatsComponent } from './components/monthly-stats/monthly-stats.component';

const routes: Routes = [
  {
    path: 'statistic',
    component: UserStatsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [UserStatsComponent, ExpenseTableComponent, MonthlyStatsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class StatisticModule {}
