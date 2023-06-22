import '@testing-library/jest-dom/extend-expect
import { fireEvent, render } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('allows form use', () => {   
        render(<App />);
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
});
