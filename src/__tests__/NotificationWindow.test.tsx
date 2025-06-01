import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotificationWindow from '../features/NotificationWindow/NotificationWindow';

describe('notification window tests', () => {
    test('test notification window title', () => {
        const title = 'test title';

        render(<NotificationWindow title={title} />);

        expect(screen.getByText(title)).not.toBeNull();
    });
});
