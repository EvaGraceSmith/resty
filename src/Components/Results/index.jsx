import React from 'react';
import './Results.scss';
import Loading from '../Loading/Loading';

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
            {loading && <Loading />}
            <div className="response-headers" data-testid="response-headers">
        <h3>Response Headers:</h3>
        <pre>{headers ? JSON.stringify(formatHeaders(), undefined, 2) : null}</pre>
      </div>
      <div className="response-data" data-testid="response-data">
        <h3>Response Data:</h3>
        <pre>{data ? JSON.stringify(data, undefined, 2) : null}</pre>
      </div>
    </section>
  );
}

export default Results;
