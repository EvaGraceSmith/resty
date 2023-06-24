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
  data: JSON.parse(localStorage.getItem('data')) || null,
  headers: new Headers(),
  requestParams: {},
  history: JSON.parse(localStorage.getItem('history')) || [],
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
        const updatedHistory = [...state.history, action.payload];
        localStorage.setItem('history', JSON.stringify(updatedHistory));
        return {
          ...state,
          history: updatedHistory,
        };
      case 'SET_HISTORY':
        return {
          ...state,
          history: action.payload,
        };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, data, headers, requestParams, history } = state;

  useEffect(() => {
    const storedHistory = localStorage.getItem('history');
    if (storedHistory) {
      dispatch({ type: 'SET_HISTORY', payload: JSON.parse(storedHistory) });
    }
  }, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      if (requestParams.url) {
        dispatch({ type: 'SET_LOADING', payload: true });

        if (requestParams.method === 'GET') {
          const response = await fetch(requestParams.url);
          const newData = await response.json();

          // Retrieve existing data from local storage
          const storedData = localStorage.getItem('data');
          const existingData = JSON.parse(storedData) || [];

          // Append the new response to the existing data array
          const updatedData = [...existingData, newData];

          // Store the updated data in local storage
          localStorage.setItem('data', JSON.stringify(updatedData));

          dispatch({ type: 'SET_HEADERS', payload: response.headers });
          dispatch({ type: 'SET_DATA', payload: newData });
        } else {
          // Handle POST, PUT, and DELETE operations using local storage
          let updatedData = null;
          let updatedHeaders = new Headers();

          if (requestParams.method === 'POST' || requestParams.method === 'PUT') {
            // Handle POST and PUT by updating data in local storage
            const storedData = localStorage.getItem('data');
            const newData = JSON.parse(storedData) || [];
            newData.push(requestParams.body);
            localStorage.setItem('data', JSON.stringify(newData));
            updatedData = newData;
          } else if (requestParams.method === 'DELETE') {
            console.log('DELETE' , requestParams.body);
            // Handle DELETE by removing data from local storage
            const storedData = localStorage.getItem('data');
            const newData = JSON.parse(storedData) || [];

            // Filter out the item to be deleted
            const filteredData = newData.filter(item => !JSON.stringify(item).includes(requestParams.body));

            // const filteredData = newData.filter(item => !item.includes(requestParams.body));
            localStorage.setItem('data', JSON.stringify(filteredData));
            updatedData = filteredData;
          }

          dispatch({ type: 'SET_HEADERS', payload: updatedHeaders });
          dispatch({ type: 'SET_DATA', payload: updatedData });
        }

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
