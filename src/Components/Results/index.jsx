import React from 'react';
import './Results.scss';

function Results(props) {
  const { headers, data, loading } = props;

  const formatHeaders = () => {
    const formattedHeaders = {};
    headers.forEach((value, name) => {
      formattedHeaders[name] = value;
    });
    return formattedHeaders;
  };

  return (
    <section>
      <div className="response-headers">
        <h3>Response Headers:</h3>
        <pre>{headers ? JSON.stringify(formatHeaders(), undefined, 2) : null}</pre>
      </div>
      <div className="response-data">
        <h3>Response Data:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <pre>{data ? JSON.stringify(data, undefined, 2) : null}</pre>
        )}
      </div>
    </section>
  );
}

export default Results;
