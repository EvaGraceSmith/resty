import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from '../Header';

describe('Header', () => {
  test('should render the header with the correct title', () => {
    render(<Header />);
    const titleElement = screen.getByRole('heading', { level: 1, name: /RESTy/i });
    expect(titleElement).toBeInTheDocument();
  });
});
