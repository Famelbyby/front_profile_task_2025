import React from 'react';
import './NotificationWindow.scss';
import { NOTIFICATION_WINDOW_ID } from '../../shared/Consts';

interface NotificationWindowProps {
    title: string;
}

const NotificationWindow: React.FC<NotificationWindowProps> = ({ title }) => {
    return (
        <div
            id={NOTIFICATION_WINDOW_ID}
            className={'notification-window-wrapper'}
        >
            <div className="notification-window">{title}</div>
        </div>
    );
};

export default NotificationWindow;
