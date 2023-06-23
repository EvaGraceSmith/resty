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
    if (!data) return null;

    const { count, results, ...paginationData } = data;

    const formattedData = {
      count,
      paginationData,
      results,
    };

    return formattedData;
  };

  return (
    <section>
      {loading && <Loading />}
      <div className="response-headers" data-testid="response-headers">
        <h3>Response Headers:</h3>
        <JsonPretty data={formatHeaders()}></JsonPretty>
      </div>
      <div className="response-data" data-testid="response-data">
        <h3>Response Data:</h3>
        <JsonPretty data={formatData()}></JsonPretty>
      </div>
    </section>
  );
}

export default Results;
