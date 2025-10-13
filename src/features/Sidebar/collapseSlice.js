import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarVisible: true,
};

const collapseSlice = createSlice({
  name: "collapse",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarVisible = !state.isSidebarVisible;
    },
    setSidebarVisible: (state, action) => {
      state.isSidebarVisible = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarVisible } = collapseSlice.actions;
export default collapseSlice.reducer;
