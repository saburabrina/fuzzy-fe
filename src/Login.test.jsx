import { fireEvent, render, screen } from '@testing-library/react';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';
import * as ReactQuery from '@tanstack/react-query';
import * as mutations from './state/mutations';

jest.mock('./state/mutations');

describe('Login page', () => {
  const loginData = { email: 'test@test', password: 'password' };
  test('Renders correctly', () => {
    const mockedFn = jest.fn();
    jest.spyOn(mutations, 'useLogin').mockImplementation().mockReturnValue({ mutate: mockedFn });

    render(
      <ReactQuery.QueryClientProvider client={new ReactQuery.QueryClient()}>
        <MemoryRouter initialEntries={['/login']}>
          <Login />
        </MemoryRouter>
      </ReactQuery.QueryClientProvider>,
    );

    expect(screen.getByTestId('login')).toBeInTheDocument();

    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: loginData.email } });

    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: loginData.password } });

    const submitButton = screen.getByTestId('loginButton');

    fireEvent(
      submitButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    const form = new FormData();
    form.set('email', loginData.email);
    form.set('password', loginData.password);

    const data = new URLSearchParams(form);

    expect(mockedFn).toHaveBeenCalledWith(data);
  });
});
