import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentDayState {
    day: string;
}

const initialState: CurrentDayState = {
    day: String(new Date()),
};

const currentDaySlice = createSlice({
    name: 'current',
    initialState,
    reducers: {
        setCurrentDay(state, action: PayloadAction<string>) {
            state.day = action.payload;
        },
    },
});

export const { setCurrentDay } = currentDaySlice.actions;
export default currentDaySlice.reducer;