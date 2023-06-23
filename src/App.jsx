import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import './App.scss';

function App() {
  const [headers, setHeaders] = useState(new Headers());
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (requestParams.url) {
          setLoading(true);
          const response = await fetch(requestParams.url);
          const newData = await response.json();
          setHeaders(response.headers);
          setData(newData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [requestParams]);

  const handleSubmit = (formData) => {
    setRequestParams(formData);
  };

  return (
    <>
      <Header />
      <div className="topDiv">Request Method: {requestParams.method}</div>
      <div className="topDiv">URL: {requestParams.url}</div>
      <Form handleApiCall={handleSubmit} />
      <Results loading={loading} headers={headers} data={data} />
      <Footer />
    </>
  );
}


export default App;
