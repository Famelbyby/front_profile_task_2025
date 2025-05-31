import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './slices/TableSlice';
import addRecordReducer from './slices/AddRecordSlice';

export const store = configureStore({
    reducer: {
        table: tableReducer,
        addRecord: addRecordReducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
