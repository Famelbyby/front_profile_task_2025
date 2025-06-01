import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PostRecord } from '../../pages/TablePage/TablePageAPI';
import type { PostRecordAnswer } from '../../shared/Interfaces';
import { CODE_CREATED } from '../../shared/Codes';
import {
    NOTIFICATION_WINDOW_ID,
    NOTIFICATION_WINDOW_VISIBLE_CLASS,
} from '../../shared/Consts';

export interface AddRecordState {
    fields: string[];
    isValidRecord: boolean;
    isWaitingForResponse: boolean;
}

interface ChangeFieldProps {
    index: number;
    newValue: string;
}

const INITIAL_FIELDS_STATE = ['', '', '', '', ''];

const initialState: AddRecordState = {
    fields: INITIAL_FIELDS_STATE,
    isValidRecord: false,
    isWaitingForResponse: false,
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

            state.fields = [
                ...state.fields.slice(0, deletedIndex),
                ...state.fields.slice(deletedIndex + 1),
            ];
            state.isValidRecord = state.fields.reduce(
                (isValid, field) => isValid && field !== '',
                true
            );
        },
        changeField: (
            state: AddRecordState,
            action: PayloadAction<ChangeFieldProps>
        ) => {
            const { index, newValue } = action.payload;

            state.fields[index] = newValue;
            state.isValidRecord = state.fields.reduce(
                (isValid, field) => isValid && field !== '',
                true
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(PostRecord.pending, (state: AddRecordState) => {
                state.isWaitingForResponse = true;
            })
            .addCase(PostRecord.fulfilled, (state: AddRecordState, action) => {
                const { status } = action.payload as PostRecordAnswer;

                state.isWaitingForResponse = false;

                if (status !== CODE_CREATED) {
                    return;
                }

                const notificationWindow = document.getElementById(
                    NOTIFICATION_WINDOW_ID
                );

                if (notificationWindow !== null) {
                    notificationWindow.classList.add(
                        NOTIFICATION_WINDOW_VISIBLE_CLASS
                    );

                    setTimeout(() => {
                        notificationWindow.classList.remove(
                            NOTIFICATION_WINDOW_VISIBLE_CLASS
                        );
                    }, 2000);
                }

                state.fields = INITIAL_FIELDS_STATE;
                state.isValidRecord = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { addField, clearAllFields, deleteField, changeField } =
    addRecordSlice.actions;

export default addRecordSlice.reducer;
