export interface UserTypes{
    uid: string;
    displayName: string;
    email: string;
    photoUrl: string;
}

export interface LoadingTypes{
    loadingCounter: number;
}

export interface ExpenseItemTypes{
    id?: string;
    name: string;
    cost: string;
    type: string;
    date: string;
    note?: string;
}