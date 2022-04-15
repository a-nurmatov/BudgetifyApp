export interface CategoryInterface {
  _id?: string;
  updatedAt?: string;
  createdAt?: string;
  _v?: number;
  title: string;
  type: string;
  userId: string | null;
  uniqueness?: string;
}
