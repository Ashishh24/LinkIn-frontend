import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: (state, action) => {
            if(state.length === 1) return null;
            const pendingFeed = state.filter((f) => f._id !== action.payload);
            return pendingFeed;
        },
        clearFeed: (state, action) => null,
    }
})

export const {addFeed, removeFeed, clearFeed} = feedSlice.actions;
export default feedSlice.reducer;