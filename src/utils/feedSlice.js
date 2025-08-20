import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
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