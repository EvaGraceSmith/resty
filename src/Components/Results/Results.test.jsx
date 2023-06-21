import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Results from '../Results';

describe('Results', () => {
  test('should render the response headers and data', () => {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-RateLimit-Limit': '60',
    });
    const data = { count: 2, results: [{ name: 'Luke Skywalker' }, { name: 'Darth Vader' }] };
    render(<Results headers={headers} data={data} />);

    const headersSection = screen.getByText('Response Headers:');
    const responseDataSection = screen.getByText('Response Data:');

    expect(headersSection).toBeInTheDocument();
    expect(responseDataSection).toBeInTheDocument();

    const formattedHeaders = screen.getByTestId('response-headers');
    const responseData = screen.getByTestId('response-data');

    expect(formattedHeaders).toHaveTextContent('"content-type": "application/json"');
    expect(formattedHeaders).toHaveTextContent('"x-ratelimit-limit": "60"');
    expect(responseData).toHaveTextContent('"count": 2');
    expect(responseData).toHaveTextContent('"name": "Luke Skywalker"');
    expect(responseData).toHaveTextContent('"name": "Darth Vader"');
  });
});
