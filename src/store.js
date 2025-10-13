import { configureStore } from "@reduxjs/toolkit";
import builderReducer from "./features/dashboard/builderSlice";
import authReducer from "./features/auth/authSlice";

import collapseReducer from "./features/Sidebar/collapseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: builderReducer,
 collapse: collapseReducer,
   
  },
});
