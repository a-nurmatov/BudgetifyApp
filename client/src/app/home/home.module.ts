import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, LayoutModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
