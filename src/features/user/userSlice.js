import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  infos: null,
};

const fetchUser = createAsyncThunk("fetchUser", async (token, { rejectWithValue }) => {
  try {
    const res = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.message);
    }

    return resData.body;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.infos = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export { fetchUser };
