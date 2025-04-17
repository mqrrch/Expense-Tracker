export interface UserTypes{
    uid: string;
    displayName: string;
    email: string;
    photoUrl: string;
}

export interface LoadingTypes{
    loadingCounter: number;
}

export interface TransactionItemTypes{
    id?: string;
    type: string;
    name: string;
    cost: number;
    category: string;
    time: string;
    date: string;
}