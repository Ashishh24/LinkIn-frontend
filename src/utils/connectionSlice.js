import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnection: (store, action) => action.payload,
        removeConnection: (store, action) => null,
    }
})

export const {addConnection, removeConnection} = connectionSlice.actions;

export default connectionSlice.reducer;