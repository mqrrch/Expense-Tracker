import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { ExpenseItemTypes } from "./types";

interface RootState {
    user: {
        uid: string;
    }
}

export const addExpenseItemAsync = createAsyncThunk<
    { id: string } & ExpenseItemTypes,
    ExpenseItemTypes,
    { state: RootState }
>(
    'expenses/addExpenseItemAsync',
    async (itemData, { getState, rejectWithValue }) => {
        const uid = getState().user.uid;
        try{
            const userExpensesRef = collection(doc(db, 'users', uid), 'expenses');
            const docRef = await addDoc(userExpensesRef, { ...itemData });
            return { id: docRef.id, ...itemData };
        } catch(err){
            console.log(err);
            return rejectWithValue(err);
        }
    }
)

// export const removeExpenseItemAsync = createAsyncThunk(
//     'expenses/removeExpenseItemAsync',
//     async (itemData, { rejectWithValue }) => {
//         try {
//             await deleteDoc(doc(db, 'expenses', itemData.id));
//             return itemData.id;
//         } catch(err){
//             console.log(err);
//             return rejectWithValue(err);
//         }
//     }
// )