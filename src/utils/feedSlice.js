import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        // removeFeed: (state, action) => {
        //     if(state.length === 1) return null;
        //     const pendingFeed = state.filter((f) => f._id !== action.payload);
        //     return pendingFeed;
        // },
        updateRequestStatus: (state, action) => {
            const { userId, status } = action.payload;
            const person = state.find(p => p._id === userId);
            if (person) {
                person.requestStatus = status; // e.g. "sent"
            }
        },
        clearFeed: (state, action) => null,
    }
})

export const {addFeed, removeFeed, updateRequestStatus, clearFeed} = feedSlice.actions;
export default feedSlice.reducer;