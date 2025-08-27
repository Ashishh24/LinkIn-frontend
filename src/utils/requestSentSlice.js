import { createSlice } from "@reduxjs/toolkit";

const requestSentSlice = createSlice({
  name: "requestsSent",
  initialState: null,
  reducers: {
    addRequestSent: (state, action) => action.payload,
    removeRequestSent: (state, action) => {
      if (state.length === 1) return null;
      const pendingRequestsSent = state.filter((r) => r._id !== action.payload);
      return pendingRequestsSent;
    },
    clearRequestsSent: (state, action) => null,
  },
});

export const { addRequestSent, removeRequestSent, clearRequestsSent } =
  requestSentSlice.actions;
export default requestSentSlice.reducer;
