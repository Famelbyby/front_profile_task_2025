import type React from "react";
import AddRecordLayout from '../../widgets/AddRecordLayout/AddRecordLayout'
import TableLayout from '../../widgets/TableLayout/TableLayout'
import './TablePage.scss'

const TablePage: React.FC = () => {
    return (
        <div className="table-page">
            <AddRecordLayout />
            <TableLayout />
        </div>
    )
};

export default TablePage;