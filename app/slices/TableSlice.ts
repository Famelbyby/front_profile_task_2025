import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
    GetRecordsAnswer,
    PostRecordAnswer,
    RecordType,
} from '../../shared/Interfaces';
import { GetRecords, PostRecord } from '../../pages/TablePage/TablePageAPI';
import { CODE_CREATED, CODE_OK } from '../../shared/Codes';

export interface TableState {
    records: RecordType[];
    page: number;
    waitingForLoading: boolean;
    lastPage: number;
}

const initialState: TableState = {
    records: [],
    page: 1,
    waitingForLoading: false,
    lastPage: -1,
};

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setWaitingForLoading: (state: TableState) => {
            state.waitingForLoading = true;
        },
        setRecords: (
            state: TableState,
            action: PayloadAction<RecordType[]>
        ) => {
            const newRecords = action.payload;

            state.records = newRecords;
        },
        addRecord: (state: TableState, action: PayloadAction<RecordType>) => {
            const newRecord = action.payload;

            state.records = [...state.records, newRecord];
        },
        clearRecords: (state: TableState) => {
            state.records = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetRecords.fulfilled, (state: TableState, action) => {
                const { status, records, lastPage } =
                    action.payload as GetRecordsAnswer;

                if (status !== CODE_OK) {
                    return;
                }

                state.waitingForLoading = false;

                if (records !== undefined) {
                    state.records = [...state.records, ...records];
                }

                if (lastPage !== null) {
                    state.lastPage = lastPage;
                }

                state.page += 1;
            })
            .addCase(PostRecord.fulfilled, (state: TableState, action) => {
                const { status, record } =
                    action.payload as unknown as PostRecordAnswer;

                if (status !== CODE_CREATED) {
                    return;
                }

                if (state.lastPage < state.page && record !== undefined) {
                    state.records = [...state.records, record];
                }
            });
    },
});

// Action creators are generated for each case reducer function
export const { setRecords, addRecord, clearRecords, setWaitingForLoading } =
    tableSlice.actions;

export default tableSlice.reducer;
