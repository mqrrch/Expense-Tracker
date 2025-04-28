export interface UserTypes{
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
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
    frequency: string;
    date: string;
    nextPaymentDate: string ;
}