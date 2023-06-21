import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Loading from './Loading.jsx';

describe('Loading', () => {
  test('should render the loading text', () => {
    render(<Loading />);
    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });
});
