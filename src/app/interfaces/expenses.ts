export interface IExpense {
    id: string;
    description: string;
    amount: number;
    category: string;
    isFixed: boolean;
    date: string;
}