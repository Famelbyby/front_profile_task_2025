import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AddRecordState {
    fields: string[];
    isValidRecord: boolean;
}

interface ChangeFieldProps {
    index: number;
    newValue: string;
}

const INITIAL_FIELDS_STATE = ['', '', '', '', ''];

const initialState: AddRecordState = {
    fields: INITIAL_FIELDS_STATE,
    isValidRecord: false,
};

export const addRecordSlice = createSlice({
    name: 'add-record',
    initialState,
    reducers: {
        addField: (state: AddRecordState) => {
            state.fields.push('');
            state.isValidRecord = false;
        },
        clearAllFields: (state: AddRecordState) => {
            state.fields = INITIAL_FIELDS_STATE;
            state.isValidRecord = false;
        },
        deleteField: (state: AddRecordState, action: PayloadAction<number>) => {
            const deletedIndex = action.payload;

            if (deletedIndex < 0 || deletedIndex > state.fields.length) {
                return;
            }

            state.fields = [...state.fields.slice(0, deletedIndex), ...state.fields.slice(deletedIndex + 1)];
            state.isValidRecord = state.fields.reduce((isValid, field) => isValid && (field !== ''), true);
        },
        changeField: (state: AddRecordState, action: PayloadAction<ChangeFieldProps>) => {
            const {index, newValue} = action.payload;

            state.fields[index] = newValue;
            state.isValidRecord = state.fields.reduce((isValid, field) => isValid && (field !== ''), true);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addField, clearAllFields, deleteField, changeField } = addRecordSlice.actions;

export default addRecordSlice.reducer;
