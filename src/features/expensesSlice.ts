import { createSlice } from "@reduxjs/toolkit"
import { addExpenseItemAsync } from "./expensesAsyncThunks";
import { ExpenseItemTypes } from "./types";

interface InitialState{
    expenses: ExpenseItemTypes[];
    loading: boolean;
    error: string;
}

const initialState: InitialState = {
    expenses: [],
    loading: false,
    error: '',
}

// Expenses array will have this format:
// - Title
// - Cost
// - Date
// - Type
// - Note

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setExpenses: (state, action) => {
            state.expenses = action.payload;
        }
    },
})

export const { setExpenses } = expensesSlice.actions;
export const expensesReducer = expensesSlice.reducer;