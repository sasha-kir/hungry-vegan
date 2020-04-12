import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotFoundPage from '../components/404-page';

describe('NotFoundPage', () => {
    it('renders and displays placeholder image', async () => {
        render(<NotFoundPage />);

        await waitFor(() => screen.getByTestId('404-image'));

        expect(screen.getByTestId('404-image')).toBeVisible();
    });
});
