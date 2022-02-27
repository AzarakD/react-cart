import { Provider } from 'react-redux';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { createAPI } from '../services/api';
import App from './app';
import { State } from '../types/state';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore();

const fakeApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

describe('Application', () => {
  it('should render Cart page when the app starts', () => {
    render(fakeApp);

    expect(screen.getByText(/Main/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(screen.getByText(/Info/i)).toBeInTheDocument();
  });
});
