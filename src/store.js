import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import accountsRecucer from "./slices/accountsSlice";

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  accounts: accountsRecucer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export { rootReducer };
