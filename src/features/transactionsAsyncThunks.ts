import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { TransactionItemTypes } from "./types";

interface RootState {
    user: {
        uid: string;
    }
}

export const addTransactionAsync = createAsyncThunk<
    { id: string } & TransactionItemTypes,
    TransactionItemTypes,
    { state: RootState }
>(
    'transactions/addTransactionAsync',
    async (itemData, { getState, rejectWithValue }) => {
        const uid = getState().user.uid;
        try{
            const docRef = doc(collection(doc(db, 'users', uid), 'transactions'));
            await setDoc(docRef, { id: docRef.id, ...itemData });
            return { id: docRef.id, ...itemData };
        } catch(err){
            console.log(err);
            return rejectWithValue(err);
        }
    }
)

export const editTransactionAsync = createAsyncThunk<
    { id: string } & TransactionItemTypes,
    TransactionItemTypes,
    { state: RootState }
>(
    'transactions/editTransactionAsync',
    async (itemData, { getState, rejectWithValue }) => {
        const uid = getState().user.uid;
        try{
            // Using non-null assertion operator cause i am confident that itemData.id will always be a string and not undefined
            const transactionId = itemData.id!
            const userTransactionsRef = collection(doc(db, 'users', uid), 'transactions');
            const transactionRef = doc(userTransactionsRef, transactionId);
            await updateDoc(transactionRef, { 
                type: itemData.type,
                name: itemData.name,
                cost: itemData.cost,
                category: itemData.category,
                time: itemData.time,
                date: itemData.date,
             });
            return { id: transactionId, ...itemData };
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