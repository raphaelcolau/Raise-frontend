import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Training} from '../../components/type/types';

type DayTraining = {
    [key: string]: Array<Training>;
}

interface SavedTraining {
    saved: {};
}

const initialState: SavedTraining = {
    saved: {},
};

const savedTrainingSlice = createSlice({
    name: 'savedTraining',
    initialState,
    reducers: {
        updateTrainings(state, action: PayloadAction<Training>) {
            state.saved = action.payload;
        },
    },
});

export const {updateTrainings} = savedTrainingSlice.actions;
export default savedTrainingSlice.reducer;