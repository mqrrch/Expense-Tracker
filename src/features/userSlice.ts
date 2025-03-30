import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    uid: '',
    displayName: '',
    email: '',
    photoUrl: '',
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.photoUrl = action.payload.photoUrl;
        },
        clearUser: (state) => {
            state.uid = '';
            state.displayName = '';
            state.email = '';
            state.photoUrl = '';
        },
    }
})

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;