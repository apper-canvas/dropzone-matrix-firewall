import { createSlice } from '@reduxjs/toolkit';

const initialState = {
user: null,
  isAuthenticated: false,
  userType: null,
  userRole: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
setUser: (state, action) => {
      // CRITICAL: Always use deep cloning to avoid reference issues
      // This prevents potential issues with object mutations
      state.user = JSON.parse(JSON.stringify(action.payload));
      state.isAuthenticated = !!action.payload;
      // Extract userType from user data if available
      state.userType = action.payload?.user_type_c || null;
      // Extract userRole from user data if available
      state.userRole = action.payload?.user_role_c || null;
    },
clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.userType = null;
      state.userRole = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;