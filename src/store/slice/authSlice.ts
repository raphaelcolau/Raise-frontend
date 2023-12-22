import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setToken, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;