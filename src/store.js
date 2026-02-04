import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import accountsRecucer from "./slices/accountsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    accounts: accountsRecucer,
  },
});

export default store;
