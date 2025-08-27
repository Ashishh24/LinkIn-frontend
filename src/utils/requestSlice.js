import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: (state, action) => {
      if (state.length === 1) return null;
      const pendingRequests = state.filter((r) => r._id !== action.payload);
      return pendingRequests;
    },
    clearRequests: (state, action) => null,
  },
});

export const { addRequest, removeRequest, clearRequests } =
  requestSlice.actions;
export default requestSlice.reducer;
