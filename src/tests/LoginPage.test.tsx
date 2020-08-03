import React from 'react';
import { publicApi } from 'api';
import { fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRouter } from './test-utils/renderUtils';
import LoginPage from 'components/login-page';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

const apiMock = jest.spyOn(publicApi, 'post');

const setup = async () => {
    const page = renderWithRouter(<LoginPage />, { route: '/login' });
    const { debug } = page;
    const loginForm = await page.findByTestId('login-form');
    const usernameField = page.getByTestId('username-input');
    const passwordField = page.getByTestId('password-input');
    const submitButton = page.getByTestId('login-submit-btn');
    return {
        page,
        debug,
        loginForm,
        usernameField,
        passwordField,
        submitButton,
    };
};

describe('LoginPage', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render and display form', async () => {
        const { loginForm } = await setup();
        expect(loginForm).toBeVisible();
    });

    it('should validate fields correctly', async () => {
        const { page, usernameField, passwordField, submitButton } = await setup();
        fireEvent.click(submitButton);

        expect(await page.findByTestId('username-input-error')).toBeVisible();
        expect(await page.findByTestId('password-input-error')).toBeVisible();
        await waitFor(() => expect(apiMock).not.toHaveBeenCalled());

        fireEvent.change(usernameField, { target: { value: 'test' } });
        fireEvent.click(submitButton);

        expect(await page.findByTestId('password-input-error')).toBeVisible();
        expect(page.queryByTestId('username-input-error')).toBeNull();
        await waitFor(() => expect(apiMock).not.toHaveBeenCalled());

        fireEvent.change(usernameField, { target: { value: '' } });
        fireEvent.change(passwordField, { target: { value: 'test' } });
        fireEvent.click(submitButton);

        expect(await page.findByTestId('username-input-error')).toBeVisible();
        expect(page.queryByTestId('password-input-error')).toBeNull();
        await waitFor(() => expect(apiMock).not.toHaveBeenCalled());
    });

    it('should clear error after focus', async () => {
        const { page, usernameField, submitButton } = await setup();
        fireEvent.click(submitButton);

        expect(await page.findByTestId('username-input-error')).toBeVisible();
        expect(await page.findByTestId('password-input-error')).toBeVisible();

        fireEvent.focus(usernameField);
        expect(page.queryByTestId('username-input-error')).toBeNull();
        expect(page.queryByTestId('password-input-error')).toBeNull();
    });

    it('should show error if wrong credentials', async () => {
        const { page, usernameField, passwordField, submitButton } = await setup();
        const testCreds = { username: 'test_user', password: 'test_pass' };

        apiMock.mockRejectedValueOnce({
            error: 'error',
        });

        fireEvent.change(usernameField, { target: { value: testCreds.username } });
        fireEvent.change(passwordField, { target: { value: testCreds.password } });
        await waitFor(() => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => expect(apiMock).toHaveBeenCalledWith('/login', testCreds));
        expect(await page.findByTestId('password-input-error')).toBeVisible();
        await waitFor(() => expect(mockHistoryPush).not.toHaveBeenCalled());
    });

    it('should submit field data to server', async () => {
        const { page, usernameField, passwordField, submitButton } = await setup();
        const testCreds = { username: 'test_user', password: 'test_pass' };

        apiMock.mockResolvedValueOnce({
            data: {
                token: 'token',
            },
        });

        fireEvent.change(usernameField, { target: { value: testCreds.username } });
        fireEvent.change(passwordField, { target: { value: testCreds.password } });
        await waitFor(() => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => expect(apiMock).toHaveBeenCalledWith('/login', testCreds));
        await waitFor(() => expect(page.queryByTestId('username-input-error')).toBeNull());
        await waitFor(() => expect(page.queryByTestId('password-input-error')).toBeNull());
        await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/home'));
    });
});
