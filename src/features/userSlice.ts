import { createSlice } from "@reduxjs/toolkit"
import { UserTypes } from "./types";

const initialState: UserTypes = {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
        },
        clearUser: (state) => {
            state.uid = '';
            state.displayName = '';
            state.email = '';
            state.photoURL = '';
        },
    }
})

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;