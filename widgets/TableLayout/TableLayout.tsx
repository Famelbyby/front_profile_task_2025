import React, { useEffect, useRef } from 'react';
import './TableLayout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type AppState } from '../../app/store';
import { GetRecords } from '../../pages/TablePage/TablePageAPI';
import {
    clearRecords,
    setWaitingForLoading,
} from '../../app/slices/TableSlice';
import TableRecord from '../../entity/Record/Record';

const SCROLL_EDGE = 1000;

const TableLayout: React.FC = () => {
    const { records, page, waitingForLoading, lastPage } = useSelector(
        (state: AppState) => state.table
    );
    const dispatch = useDispatch<AppDispatch>();

    const tableLayout = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(GetRecords(1));

        return () => {
            dispatch(clearRecords());
        };
    }, [dispatch]);

    function UpdateRecords() {
        dispatch(GetRecords(page));
        dispatch(setWaitingForLoading());
    }

    return (
        <div
            ref={tableLayout}
            className="table-layout"
            onScroll={() => {
                console.log(
                    tableLayout.current?.scrollTop,
                    tableLayout.current?.scrollHeight
                );

                if (tableLayout.current !== null) {
                    if (
                        tableLayout.current.scrollTop + SCROLL_EDGE >=
                            tableLayout.current.scrollHeight &&
                        !waitingForLoading &&
                        page <= lastPage
                    ) {
                        UpdateRecords();
                    }
                }
            }}
        >
            {records.length > 0 && (
                <>
                    {records.map((record, index) => {
                        return (
                            <TableRecord
                                fields={record.fields}
                                index={index + 1}
                                key={index}
                            />
                        );
                    })}
                </>
            )}
            {records.length === 0 && (
                <div className="table-layout__no-records">Записей нет</div>
            )}
            {waitingForLoading && (
                <div className="table-loading">
                    <span className="table-loading__spinner"></span>
                </div>
            )}
        </div>
    );
};

export default TableLayout;
