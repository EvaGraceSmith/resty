// History.jsx
import React from 'react';
import './History.scss';

function History({ history, dispatch }) {
  const handleHistoryClick = (requestParams) => {
    dispatch({ type: 'SET_REQUEST_PARAMS', payload: requestParams });
  };

  return (
    <div className="history">
      <h2>History</h2>
      {history.map((request, index) => (
        <div
          key={index}
          className="history-item"
          onClick={() => handleHistoryClick(request)}
        >
          <div>Method: {request.method}</div>
          <div>URL: {request.url}</div>
          <div>Body: {request.body}</div>
        </div>
      ))}
    </div>
  );
}

export default History;
