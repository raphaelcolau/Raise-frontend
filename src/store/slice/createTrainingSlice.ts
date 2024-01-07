import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DAYS } from '../../components/type/types';
import  { CreateTrainingProps } from '../../components/type/types';

const initialState: CreateTrainingProps = {
    name: '',
    description: '',
    trainingDays: [],
    sportPreset: null,
    startDate: null,
    endDate: null,
    hasWarmUp: false,
    hasStretching: false,
    iconName: '',
    iconHexadecimalColor: '',
};

const createTrainingSlice = createSlice({
    name: 'createTraining',
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload;
        },
        setTrainingDays(state, action: PayloadAction<Array<DAYS>>) {
            state.trainingDays = action.payload;
        },
        setSportPreset(state, action: PayloadAction<string>) {
            state.sportPreset = action.payload;
        },
        setStartDate(state, action: PayloadAction<string>) {
            state.startDate = action.payload;
        },
        setEndDate(state, action: PayloadAction<string>) {
            state.endDate = action.payload;
        },
        setHasWarmUp(state, action: PayloadAction<boolean>) {
            state.hasWarmUp = action.payload;
        },
        setHasStretching(state, action: PayloadAction<boolean>) {
            state.hasStretching = action.payload;
        },
        setIconName(state, action: PayloadAction<string>) {
            state.iconName = action.payload;
        },
        setIconHexadecimalColor(state, action: PayloadAction<string>) {
            state.iconHexadecimalColor = action.payload;
        },
        resetTraining(state) {
            state.name = '';
            state.description = '';
            state.trainingDays = [];
            state.sportPreset = null;
            state.startDate = null;
            state.endDate = null;
            state.hasWarmUp = false;
            state.hasStretching = false;
            state.iconName = '';
            state.iconHexadecimalColor = '';
        },
    },
});

export const {
    setName,
    setDescription,
    setTrainingDays,
    setSportPreset,
    setStartDate,
    setEndDate,
    setHasWarmUp,
    setHasStretching,
    setIconName,
    setIconHexadecimalColor,
    resetTraining,
} = createTrainingSlice.actions;
export default createTrainingSlice.reducer;