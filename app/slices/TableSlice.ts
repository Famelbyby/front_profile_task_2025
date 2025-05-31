import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RecordType } from '../../shared/Interfaces';

const RECORDS_MOCK: RecordType[] = [
    { fields: ['asdas', 'asdas', '-d-s'] },
    { fields: ['asdas', 'asdas', '-d-s', 'as', 'fdjfdnvdfhvhjfvnjfdvdfj'] },
    {fields: ['32423', 'vd,vlk', '1','32423', 'vd,vlk', 'fdjfdnvdfhvhjfvnjfdvdfj','32423', 'vd,vlk', '1','32423', 'vd,vlk', '1','32423', 'vd,vlk', '1']},
];

export interface TableState {
    records: RecordType[];
}

const initialState: TableState = {
    records: RECORDS_MOCK,
};

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
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
    },
});

// Action creators are generated for each case reducer function
export const { setRecords, addRecord } = tableSlice.actions;

export default tableSlice.reducer;
