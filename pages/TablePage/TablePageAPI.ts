import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CODE_OK, SERVER_ERROR } from '../../shared/Codes';
import type { RecordType } from '../../shared/Interfaces';

export const GetRecords = createAsyncThunk('tablePage/getRecords', async () => {
    let status: number = CODE_OK;
    let records: RecordType[] | undefined;

    await axios
        .get('')
        .then((response) => {
            status = response.status;
            records = response.data;
        })
        .catch(() => {
            status = SERVER_ERROR;
        });

    return { status, records };
});
