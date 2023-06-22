import React from 'react';
import './Results.scss';
import Loading from '../Loading/Loading';
import JsonPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

function Results(props) {
  const { headers, data, loading } = props;

  const formatHeaders = () => {
    const formattedHeaders = {};
    headers.forEach((value, name) => {
      formattedHeaders[name] = value;
    });
    return formattedHeaders;
  };

  const formatData = () => {
    if (data) {
      return JSON.stringify(data, undefined, 2);
    }
    return null;
  };

  return (
    <section>
            {loading && <Loading />}
            <div className="response-headers" data-testid="response-headers">
        <h3>Response Headers:</h3>
        {/* <pre>{headers ? JSON.stringify(formatHeaders(), undefined, 2) : null}</pre> */}
        <JsonPretty data={formatHeaders()}></JsonPretty>
      </div>
      <div className="response-data" data-testid="response-data">
        <h3>Response Data:</h3>
        <JsonPretty data={data}></JsonPretty>
        {/* <pre>{formatData()}</pre> */}
      </div>
    </section>
  );
}

export default Results;
