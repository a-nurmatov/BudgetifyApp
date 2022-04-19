import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';

import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './components/category/category.component';
import { CategoryDeleteConfirmComponent } from './components/category-delete-confirm/category-delete-confirm.component';
import { EditConfirmationComponent } from './components/edit-confirm/edit-confirm.component';

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
    EditConfirmationComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class CategoryModule {}
