// history.test.jsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the jest-dom library

import History from './index';

describe('History', () => {
  test('renders history items correctly', () => {
    const history = [
      {
        method: 'GET',
        url: 'https://example.com/api/data',
        body: '',
      },
      {
        method: 'POST',
        url: 'https://example.com/api/users',
        body: JSON.stringify({ name: 'John Doe' }),
      },
    ];
    const dispatch = jest.fn();

    const { getByText } = render(<History history={history} dispatch={dispatch} />);

    // Assert that history items are rendered correctly
    const historyItem1 = getByText('Method: GET');
    expect(historyItem1).toBeInTheDocument();
    const historyItem2 = getByText('Method: POST');
    expect(historyItem2).toBeInTheDocument();

    // Simulate click on a history item
    fireEvent.click(historyItem1);

    // Assert that dispatch function is called with the correct payload
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_REQUEST_PARAMS',
      payload: history[0],
    });
  });
});
