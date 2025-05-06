import { createSlice } from "@reduxjs/toolkit"

const initialState: { loadingCounter: number } = {
    loadingCounter: 1
}

export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loadingCounter += 1;
        },
        endLoading: (state) => {
            state.loadingCounter = Math.max(0, state.loadingCounter - 1);
        },
    }
})

export const { startLoading, endLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;