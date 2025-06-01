import type React from 'react';
import AddRecordLayout from '../../widgets/AddRecordLayout/AddRecordLayout';
import TableLayout from '../../widgets/TableLayout/TableLayout';
import './TablePage.scss';
import NotificationWindow from '../../features/NotificationWindow/NotificationWindow';

const TablePage: React.FC = () => {
    return (
        <div className="table-page">
            <NotificationWindow title="Запись добавлена" />
            <AddRecordLayout />
            <TableLayout />
        </div>
    );
};

export default TablePage;
