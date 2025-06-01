import { render, screen } from '@testing-library/react';
import TableRecord from '../entity/Record/TableRecord';

describe('table record tests', () => {
    test('test all record field are existing', () => {
        const index = 3;
        const fields = ['my', 'tests', 'right', 'now', '!'];

        const { container: tableRecord } = render(
            <TableRecord index={index} fields={fields} />
        );

        expect(
            tableRecord.getElementsByClassName('table-record__field').length
        ).toBe(fields.length);
        expect(
            tableRecord.getElementsByClassName('table-record__index')[0]
                .innerHTML
        ).toBe(String(index));
    });

    test('test record field width', () => {
        const index = 3;
        const fields = ['my', 'tests', 'right', 'now', '!'];

        render(<TableRecord index={index} fields={fields} />);

        fields.forEach((field) => {
            expect(screen.getByText(field).style.maxWidth).toBe(
                `calc((100% - 60px) / ${fields.length})`
            );
        });
    });
});
