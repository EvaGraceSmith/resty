import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Results from '../Components/Results';

describe('<Results />', () => {
  test('renders loading indicator when loading prop is true', () => {
    render(<Results loading={true} />);
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });

  test('renders response headers and data when loading prop is false', () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = { count: 5, results: [], paginationData: { page: 1, total: 10 } };
    render(<Results loading={false} headers={headers} data={data} />);

    const responseHeadersTitle = screen.getByText('Response Headers:');
    expect(responseHeadersTitle).toBeInTheDocument();

    const responseDataTitle = screen.getByText('Response Data:');
    expect(responseDataTitle).toBeInTheDocument();

    const formattedHeaders = JSON.stringify({ 'Content-Type': 'application/json' }, undefined, 2);
    expect(screen.queryByText(formattedHeaders)).toBeInTheDocument();

    const formattedData = JSON.stringify(data, undefined, 2);
    expect(screen.queryByText(formattedData)).toBeInTheDocument();
  });

  test('does not render response headers and data when data prop is null', () => {
    render(<Results loading={false} headers={new Headers()} data={null} />);
    const responseHeadersTitle = screen.queryByText('Response Headers:');
    expect(responseHeadersTitle).toBeNull();

    const responseDataTitle = screen.queryByText('Response Data:');
    expect(responseDataTitle).toBeNull();
  });

  test('renders formatted headers and data when loading prop is false', () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = { count: 5, results: [], paginationData: { page: 1, total: 10 } };
    render(<Results loading={false} headers={headers} data={data} />);

    const responseHeadersTitle = screen.getByText('Response Headers:');
    expect(responseHeadersTitle).toBeInTheDocument();

    const responseDataTitle = screen.getByText('Response Data:');
    expect(responseDataTitle).toBeInTheDocument();

    const formattedHeaders = JSON.stringify({ 'Content-Type': 'application/json' }, undefined, 2);
    expect(screen.queryByText(formattedHeaders)).toBeInTheDocument();

    const formattedData = JSON.stringify(data, undefined, 2);
    expect(screen.queryByText(formattedData)).toBeInTheDocument();
  });

  test('renders formatted headers and data after clicking on a button', () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = { count: 5, results: [], paginationData: { page: 1, total: 10 } };
    render(<Results loading={false} headers={headers} data={null} />);

    const responseHeadersTitle = screen.getByText('Response Headers:');
    expect(responseHeadersTitle).toBeNull();

    const responseDataTitle = screen.getByText('Response Data:');
    expect(responseDataTitle).toBeNull();

    const button = screen.getByText('Load Data');
    fireEvent.click(button);

    const formattedHeaders = JSON.stringify({ 'Content-Type': 'application/json' }, undefined, 2);
    expect(screen.queryByText(formattedHeaders)).toBeInTheDocument();

    const formattedData = JSON.stringify(data, undefined, 2);
    expect(screen.queryByText(formattedData)).toBeInTheDocument();
  });
});
