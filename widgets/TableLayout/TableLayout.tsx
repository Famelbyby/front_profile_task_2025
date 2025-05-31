import React, { useEffect } from 'react';
import './TableLayout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type AppState } from '../../app/store';
import { GetRecords } from '../../pages/TablePage/TablePageAPI';
import { clearRecords } from '../../app/slices/TableSlice';

interface TableRecordProps {
    fields: string[];
    index: number;
}

const TableRecord: React.FC<TableRecordProps> = ({ fields, index }) => {
    return (
        <div className="table-record">
            <div className="table-record__index">{index}</div>
            {fields.map((field, fieldIndex) => {
                return (
                    <div
                        className="table-record__field"
                        style={{ maxWidth: `calc(100% / ${fields.length})` }}
                        key={fieldIndex}
                    >
                        {field}
                    </div>
                );
            })}
        </div>
    );
};

const TableLayout: React.FC = () => {
    const { records } = useSelector((state: AppState) => state.table);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(GetRecords());

        return () => {
            dispatch(clearRecords());
        };
    }, [dispatch]);

    return (
        <div className="table-layout">
            {records.length > 0 && (
                <>
                    {records.map((record, index) => {
                        return (
                            <TableRecord
                                fields={record.fields}
                                index={index}
                                key={index}
                            />
                        );
                    })}
                </>
            )}
            {records.length === 0 && (
                <div className="table-layout__no-records">Записей нет</div>
            )}
        </div>
    );
};

export default TableLayout;
