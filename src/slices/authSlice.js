import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userToken: null,
  isLoggedIn: false,
  error: null,
  loading: false,
};

const login = createAsyncThunk("login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.message);
    }

    return resData.body.token;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const logout = createAsyncThunk("logout", async () => {});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.userToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, () => initialState);
  },
});

export default authSlice.reducer;
export { login, logout };
