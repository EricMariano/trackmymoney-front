export interface IExpense {
  id: number;
  description: string;
  amount: number;
  categoryId: number | null;
  date: string;
  aiCategorized?: boolean;
  createdAt?: string;
  updatedAt?: string;
  /**
   * Campo auxiliar usado no frontend para exibir o nome da categoria
   * quando fazemos o join manualmente.
   */
  category?: string;
}