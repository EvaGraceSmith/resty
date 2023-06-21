import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Footer from '../Footer';

describe('Footer', () => {
  test('should render the footer with the correct text', () => {
    render(<Footer />);
    const footerElement = screen.getByText(/Eva Grace Smith 2023/i);
    expect(footerElement).toBeInTheDocument();
  });
});
