import { createSlice } from "@reduxjs/toolkit"
import { TransactionItemTypes } from "./types";
import { addTransactionAsync, editTransactionAsync } from "./transactionsAsyncThunks";

interface InitialState{
    transactions: TransactionItemTypes[];
    loading: boolean;
    error: string;
}

const initialState: InitialState = {
    transactions: [],
    loading: false,
    error: '',
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        },
        clearTransactions: (state) => {
            state.transactions = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTransactionAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTransactionAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = String(action.payload);
            })
            .addCase(addTransactionAsync.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(editTransactionAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(editTransactionAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = String(action.payload);
            })
            .addCase(editTransactionAsync.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
            })
    }
})

export const { setTransactions, clearTransactions } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;