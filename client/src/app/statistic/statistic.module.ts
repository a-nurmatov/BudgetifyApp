import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatsComponent } from './components/user-stats/user-stats/user-stats.component';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ExpenseTableComponent } from './components/user-stats/expense-table/expense-table.component';
import { MonthlyStatsComponent } from './components/user-stats/monthly-stats/monthly-stats.component';
import { NgxEchartsModule } from 'ngx-echarts';

const routes: Routes = [
  {
    path: 'statistic',
    component: UserStatsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    UserStatsComponent,
    ExpenseTableComponent,
    MonthlyStatsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class StatisticModule {}
