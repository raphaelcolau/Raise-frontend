import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ForgotPwdState {
  email: string;
  isEmailSent: boolean;
  isEmailSending: boolean;
  token: string;
  retryDelay: number;
  emailError: string;
}

const initialState: ForgotPwdState = {
  email: '',
  isEmailSent: false,
  isEmailSending: false,
  token: '',
  retryDelay: 0,
  emailError: '',
};

const forgotPwdSlice = createSlice({
  name: 'forgotPwd',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setIsEmailSent(state, action: PayloadAction<boolean>) {
      state.isEmailSent = action.payload;
    },
    setIsEmailSending(state, action: PayloadAction<boolean>) {
      state.isEmailSending = action.payload;
    },
    setRetryDelay(state, action: PayloadAction<number>) {
      state.retryDelay = action.payload;
    },
    setEmailError(state, action: PayloadAction<string>) {
      state.emailError = action.payload;
    },
    setPwdToken(state, action: PayloadAction<string>) {
        state.token = action.payload;
    },
  },
});

export const {
  setEmail,
  setIsEmailSent,
  setIsEmailSending,
  setRetryDelay,
  setPwdToken,
  setEmailError,
} = forgotPwdSlice.actions;
export default forgotPwdSlice;