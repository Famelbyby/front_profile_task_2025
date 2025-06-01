import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CODE_CREATED, CODE_OK, SERVER_ERROR } from '../../shared/Codes';
import type { RecordType } from '../../shared/Interfaces';
import { RECORDS_URL } from '../../shared/URLs';

export const GetRecords = createAsyncThunk(
    'tablePage/getRecords',
    async (page: number) => {
        let status: number = CODE_OK;
        let records: RecordType[] | undefined = undefined;
        let lastPage: number | null = -1;

        await axios
            .get(RECORDS_URL + '?_page=' + page)
            .then((response) => {
                status = response.status;
                records = response.data.data;
                lastPage = response.data.last;
            })
            .catch((error) => {
                console.log(error);
                status = SERVER_ERROR;
            });

        return { status, records, lastPage };
    }
);

export const PostRecord = createAsyncThunk(
    'tablePage/postRecord',
    async (newRecord: RecordType) => {
        let status: number = CODE_CREATED;
        let record: RecordType | undefined = undefined;

        await axios
            .post(RECORDS_URL, JSON.stringify(newRecord))
            .then((response) => {
                status = response.status;
                record = response.data;
            })
            .catch(() => {
                status = SERVER_ERROR;
            });

        return { status, record };
    }
);
