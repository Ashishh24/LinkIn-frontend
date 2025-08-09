import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (store, action) => action.payload,
        removeRequests: (store, action) => null,
    }
})

export const {addRequests, removeRequests} = requestSlice.actions;
export default requestSlice.reducer;