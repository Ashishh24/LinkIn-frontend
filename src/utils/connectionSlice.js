import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnection: (state, action) => action.payload,
        removeConnection: (state, action) => {
            const pendingConnections = state.filter((c) => c._id !== action.payload);
            return pendingConnections;
        },
        clearConnections: (state, action) => null,
    }
})

export const {addConnection, removeConnection, clearConnections} = connectionSlice.actions;

export default connectionSlice.reducer;