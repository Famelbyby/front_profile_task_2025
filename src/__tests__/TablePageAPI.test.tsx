import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { RECORDS_URL } from '../shared/URLs';

// eslint-disable-next-line
const thunks = require('../pages/TablePage/TablePageAPI');

jest.mock('axios', () => {
    return {
        get: jest.fn(() => {
            return new Promise((res) => {
                res({
                    status: 200,
                    data: {
                        last: 12,
                        data: ['a', 'b'],
                    },
                });
            });
        }),
        post: jest.fn(() => {
            return new Promise((res) => {
                res({
                    status: 200,
                    data: ['a', 'b', 'kek'],
                });
            });
        }),
    };
});

describe('table page get API tests', () => {
    let action: AsyncThunkAction<void, number, object>;

    const dispatch: Dispatch = jest.fn();
    const getState: () => unknown = jest.fn();

    test('test that calls the API correctly', async () => {
        action = thunks.GetRecords(1);
        await action(dispatch, getState, undefined);

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(RECORDS_URL + '?_page=1');
    });

    test('test returns true result', async () => {
        action = thunks.GetRecords(1);
        const result = await action(dispatch, getState, undefined);

        expect(result.payload).toEqual({
            status: 200,
            records: ['a', 'b'],
            lastPage: 12,
        });
    });
});

describe('table page post API tests', () => {
    let action: AsyncThunkAction<void, number, object>;

    const dispatch: Dispatch = jest.fn();
    const getState: () => unknown = jest.fn();

    test('test that calls the API correctly', async () => {
        action = thunks.PostRecord({ fields: ['a', 'b', 'c', 'd'] });
        await action(dispatch, getState, undefined);

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            RECORDS_URL,
            '{"fields":["a","b","c","d"]}'
        );
    });

    test('test that returns true result', async () => {
        action = thunks.PostRecord({ fields: ['a', 'b', 'c', 'd'] });
        const result = await action(dispatch, getState, undefined);

        expect(result.payload).toEqual({
            status: 200,
            record: ['a', 'b', 'kek'],
        });
    });
});
