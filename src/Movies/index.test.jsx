import { fireEvent, render, screen } from '@testing-library/react';
import Movies from './index';
import { MemoryRouter } from 'react-router-dom';
import * as ReactQuery from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@tanstack/react-query'),
  };
});

describe('Movies page', () => {
  const mockedData = [
    { title: 'Movie1', director: 'Fulano', average_score: 5 },
    { title: 'Movie2', director: 'Beltrano', average_score: 0 },
    { title: 'Movie3', director: 'Sicrano', average_score: 10 },
  ];

  test('Renders correctly', () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockImplementation(jest.fn().mockReturnValueOnce({ data: mockedData, isLoading: false, isSuccess: true }));

    render(
      <ReactQuery.QueryClientProvider client={new ReactQuery.QueryClient()}>
        <MemoryRouter initialEntries={['/']}>
          <Movies />
        </MemoryRouter>
      </ReactQuery.QueryClientProvider>,
    );

    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getAllByRole('rowgroup')[1].querySelectorAll('tr')).toHaveLength(mockedData.length);
  });

  test('Filter correctly', () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockImplementation(jest.fn().mockReturnValue({ data: mockedData, isLoading: false, isSuccess: true }));

    render(
      <ReactQuery.QueryClientProvider client={new ReactQuery.QueryClient()}>
        <MemoryRouter initialEntries={['/']}>
          <Movies />
        </MemoryRouter>
      </ReactQuery.QueryClientProvider>,
    );

    expect(screen.getByText('Movies')).toBeInTheDocument();

    const titleFilter = screen.getAllByRole('row')[1].querySelectorAll('input')[0];
    fireEvent.change(titleFilter, { target: { value: mockedData[0].title } });
    expect(screen.getAllByRole('rowgroup')[1].querySelectorAll('tr')).toHaveLength(1);
    expect(screen.getByText(mockedData[0].title)).toBeInTheDocument();
  });

  test('Opens create movies window', () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockImplementation(
        jest.fn().mockReturnValue({ data: [{ title: 'test', director: 'test' }], isLoading: false, isSuccess: true }),
      );

    render(
      <ReactQuery.QueryClientProvider client={new ReactQuery.QueryClient()}>
        <MemoryRouter initialEntries={['/']}>
          <Movies />
        </MemoryRouter>
      </ReactQuery.QueryClientProvider>,
    );

    fireEvent(
      screen.getByText('Create Movies'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(screen.getByText('Submit Movies')).toBeInTheDocument();
  });

  test('Opens rate movies window', () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockImplementation(
        jest.fn().mockReturnValue({ data: [{ title: 'test', director: 'test' }], isLoading: false, isSuccess: true }),
      );

    render(
      <ReactQuery.QueryClientProvider client={new ReactQuery.QueryClient()}>
        <MemoryRouter initialEntries={['/']}>
          <Movies />
        </MemoryRouter>
      </ReactQuery.QueryClientProvider>,
    );

    fireEvent(
      screen.getByText('Rate Movies'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(screen.getByText('Rate Selected Movies')).toBeInTheDocument();
  });
});
