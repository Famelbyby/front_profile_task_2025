import React from 'react';

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
                        style={{
                            maxWidth: `calc((100% - 60px) / ${fields.length})`,
                        }}
                        key={fieldIndex}
                    >
                        {field}
                    </div>
                );
            })}
        </div>
    );
};

export default TableRecord;
