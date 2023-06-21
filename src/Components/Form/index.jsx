import React, { useState } from 'react';
import './Form.scss';

function Form(props) {
  const [jsonInput, setJsonInput] = useState('');
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url || 'https://swapi.dev/api/people',
      body: jsonInput,
    };
    props.handleApiCall(formData);
  };

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input
            name="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">GO!</button>
        </label>
        <label>
          <span>Method: </span>
          <select name="method" onChange={handleMethodChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
        {(method === 'POST' || method === 'PUT') && (
          <label>
            <span>JSON Body: </span>
            <textarea name="jsonInput" value={jsonInput} onChange={handleInputChange}></textarea>
          </label>
        )}
      </form>
    </>
  );
}

export default Form;
