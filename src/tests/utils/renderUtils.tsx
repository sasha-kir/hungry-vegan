import React, { ReactElement, HTMLProps } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export const renderWithRouter = (component, { route = '/' } = {}) => {
    const history = createMemoryHistory({ initialEntries: [route] });
    const Wrapper = ({ children }: HTMLProps<Router>): ReactElement => (
        <Router history={history}>{children}</Router>
    );
    return {
        history,
        ...render(component, { wrapper: Wrapper }),
    };
};
