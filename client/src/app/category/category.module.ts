import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';
import {
  CategoryComponent,
  CategoryDeleteConfirmComponent,
} from './components/category/category.component';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    CategoryCardComponent,
    CategoryDialogComponent,
    CategoryComponent,
    CategoryDeleteConfirmComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class CategoryModule {}
