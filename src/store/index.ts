import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/userSlice";
import { transactionsReducer } from "../features/transactionsSlice";
import { loadingReducer } from "../features/loadingSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        transactions: transactionsReducer,
        loading: loadingReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;