import { render } from '@testing-library/react';
import TableLayout from '../widgets/TableLayout/TableLayout';

jest.mock('../pages/TablePage/TablePageAPI');
jest.useFakeTimers();

jest.mock('react-redux', () => {
    return {
        useRef: jest.fn((arg) => {
            return { current: arg };
        }),
        useDispatch: jest.fn(() => () => {}),
        useSelector: jest.fn(() => {
            return {
                records: [
                    { fields: ['a', 'b', 'c', 'd'] },
                    { fields: ['a', 'b', 'c', 'd'] },
                    { fields: ['a', 'b', 'c', 'd'] },
                ],
                page: 1,
                waitingForLoading: false,
                lastPage: 2,
            };
        }),
    };
});

afterAll(() => {
    jest.unmock('../pages/TablePage/TablePageAPI');
    jest.unmock('react-redux');
    jest.useRealTimers();
});

// eslint-disable-next-line
const tableRecord = require('../entity/Record/TableRecord');

describe('table layout tests', () => {
    test('test no records label', () => {
        const tableLayout = render(<TableLayout />);

        expect(tableLayout.queryAllByText('Записей нет').length).toBe(0);
    });

    test('test waiting spinner', () => {
        const { container: tableLayout } = render(<TableLayout />);

        expect(
            tableLayout.getElementsByClassName('table-loading')[0]
        ).not.toBeNull();
    });

    test('test all table records are existing', () => {
        const spy = jest.spyOn(tableRecord, 'default');

        const { container: tableLayout } = render(<TableLayout />);

        expect(spy).toHaveBeenCalledTimes(3);

        const records = tableLayout.getElementsByClassName('table-record');
        expect(records.length).toBe(3);
    });
});
