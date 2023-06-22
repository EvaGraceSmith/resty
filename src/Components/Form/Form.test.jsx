import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Form from '../Form';

describe('Form', () => {
  test('should call handleApiCall when the form is submitted', () => {
    const handleApiCall = jest.fn();
    render(<Form handleApiCall={handleApiCall} />);

    const urlInput = screen.getByLabelText('URL:');
    fireEvent.change(urlInput, { target: { value: 'https://swapi.dev/api/people/' } });

    const methodSelect = screen.getByLabelText('Method:');
    fireEvent.change(methodSelect, { target: { value: 'GET' } });

    const form = screen.getByLabelText('URL:');
    fireEvent.submit(form);

    expect(handleApiCall).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://swapi.dev/api/people/',
      body: "",
    });
  });

  test('should include the JSON body when method is POST or PUT', () => {
    const handleApiCall = jest.fn();
    render(<Form handleApiCall={handleApiCall} />);

    const urlInput = screen.getByLabelText('URL:');
    fireEvent.change(urlInput, { target: { value: 'https://swapi.dev/api/people/' } });

    const methodSelect = screen.getByLabelText('Method:');
    fireEvent.change(methodSelect, { target: { value: 'POST' } });

    const jsonInput = screen.getByLabelText('JSON Body:');
    fireEvent.change(jsonInput, { target: { value: '{"name": "Luke Skywalker"}' } });

    const form = screen.getByLabelText('URL:');
    fireEvent.submit(form);

    expect(handleApiCall).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://swapi.dev/api/people/',
      body: '{"name": "Luke Skywalker"}',
    });
  });
});
