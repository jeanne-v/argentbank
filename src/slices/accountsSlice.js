import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./authSlice";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const fetchAccounts = createAsyncThunk("fetchAccounts", async () => {
  const res = await fetch("./accounts-placeholder-data.json");
  const resData = await res.json();
  return resData;
});

const accountsSlice = createSlice({
  name: "acounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, () => initialState);
  },
});

export default accountsSlice.reducer;
export { fetchAccounts };
