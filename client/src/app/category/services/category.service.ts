import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, take, tap } from 'rxjs';
import { CategoryInterface } from '../types/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: CategoryInterface[] = [];
  private categoriesUpdated: Subject<CategoryInterface[]> = new Subject<
    CategoryInterface[]
  >();

  constructor(private http: HttpClient) {}

  addListOfNewCategories(
    newCategories: string[],
    userId: string | null,
    type: string
  ): Observable<{ message: string; response: string[] }> {
    let newCategoriesToAdd = newCategories.map((category) => {
      let uniqueness = userId + category + type;
      return {
        title: category,
        type,
        userId,
        uniqueness,
      };
    });
    return this.http.post<{ message: string; response: string[] }>(
      'http://localhost:5000/categories/multiple',
      {
        newCategoriesToAdd,
      }
    );
  }

  addNewCateogry(
    title: string,
    type: string,
    userId: string | null,
    uniqueness: string
  ): Observable<{ message: string; newCategory: CategoryInterface }> {
    return this.http
      .post<{ message: string; newCategory: CategoryInterface }>(
        `http://localhost:5000/categories`,
        {
          title,
          type,
          userId,
          uniqueness,
        }
      )
      .pipe(
        tap((data) => {
          this.categories.unshift(data.newCategory);
          this.categoriesUpdated.next([...this.categories]);
        })
      );
  }

  requestUserCategories(
    userId: string | null
  ): Observable<{ message: string; categories: CategoryInterface[] }> {
    return this.http.get<{ message: string; categories: CategoryInterface[] }>(
      `http://localhost:5000/categories/${userId}`
    );
  }

  setInitialData(categories: CategoryInterface[]): void {
    this.categories = categories;
    this.categoriesUpdated.next([...categories]);
  }

  getUserCategories(): Observable<CategoryInterface[]> {
    return this.categoriesUpdated.asObservable();
  }

  deleteCategory(category: CategoryInterface): Observable<any> {
    return this.http
      .delete(`http://localhost:5000/categories/${category._id}`)
      .pipe(
        tap(() => {
          this.categories = this.categories.filter(
            (item) => item._id !== category._id
          );
          this.categoriesUpdated.next([...this.categories]);
        })
      );
  }

  updateCategory(category: CategoryInterface): Observable<any> {
    let updatedCategory = { ...category };
    delete updatedCategory._id;
    return this.http
      .patch(
        `http://localhost:5000/categories/${category._id}`,
        updatedCategory
      )
      .pipe(
        tap(() => {
          this.categories = this.categories.map((item) => {
            if (item._id === category._id) {
              return category;
            }
            return item;
          });
          this.categoriesUpdated.next([...this.categories]);
        })
      );
  }
}
