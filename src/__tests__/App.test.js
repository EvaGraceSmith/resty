import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

// Import the request handlers
import { handlers } from '../../apiHandlers';


// Create a mock server
const server = setupServer(...handlers);

// Setup the mock server before tests
beforeAll(() => server.listen());

// Clean up the mock server after tests
afterAll(() => server.close());

describe('<App />', () => {
    test('renders data in the output area after form submission', async () => {
      // Render the component
      render(<App />);
  
      // Simulate form submission
      const urlInput = screen.getByLabelText('URL:');
      const submitButton = screen.getByText('GO!');
      fireEvent.change(urlInput, { target: { value: '/api/data' } });
      fireEvent.click(submitButton);
  
      // Wait for the data to be loaded and rendered in the output area
      await waitFor(() => {
        const outputText = screen.getByTestId('response-data');
        expect(outputText).toHaveTextContent('Response Data:{ "paginationData": { "result": "Mocked Data" } }');
      });
    });
  });
  
  
