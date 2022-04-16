import { CategoryInterface } from 'src/app/category/types/category.interface';

export interface TransactionInterface {
  accountId: string | undefined;
  amount: number;
  title: string;
  categories: string[];
  date: string;
  description: string;
  payee: string;
  type: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
