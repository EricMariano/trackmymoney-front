export interface IRevenue {
  id: number;
  description: string;
  amount: number;
  categoryId: number | null;
  date: string;
  aiCategorized?: boolean;
  createdAt?: string;
  updatedAt?: string;
  category?: string;
}