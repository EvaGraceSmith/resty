// app.jsx
import React, { useEffect, useReducer } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';
import './App.scss';

const initialState = {
  loading: false,
  data: null,
  headers: new Headers(),
  requestParams: {},
  history: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload,
      };
    case 'SET_HEADERS':
      return {
        ...state,
        headers: action.payload,
      };
    case 'SET_REQUEST_PARAMS':
      return {
        ...state,
        requestParams: action.payload,
      };
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, data, headers, requestParams, history } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (requestParams.url) {
          dispatch({ type: 'SET_LOADING', payload: true });
          const response = await fetch(requestParams.url);
          const newData = await response.json();
          dispatch({ type: 'SET_HEADERS', payload: response.headers });
          dispatch({ type: 'SET_DATA', payload: newData });
          dispatch({ type: 'ADD_TO_HISTORY', payload: requestParams });
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Error:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchData();
  }, [requestParams]);

  const handleSubmit = (formData) => {
    dispatch({ type: 'SET_DATA', payload: null }); // Clear previous data
    dispatch({ type: 'SET_HEADERS', payload: new Headers() }); // Clear previous headers
    dispatch({ type: 'SET_REQUEST_PARAMS', payload: formData });
  };

  return (
    <>
      <Header />
      <div className="topDiv">Request Method: {requestParams.method}</div>
      <div className="topDiv">URL: {requestParams.url}</div>
      <Form handleApiCall={handleSubmit} />
      <Results loading={loading} headers={headers} data={data} />
      <History history={history} dispatch={dispatch} />
      <Footer />
    </>
  );
}

export default App;
