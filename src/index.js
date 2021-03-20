import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from 'react-apollo';
import {createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
////////////////////////////////////////////////////
import {Provider } from 'react-redux';
import {Store} from './redux/store';


const cache =new InMemoryCache();

const httpsLink = createHttpLink({
  uri:'http://localhost:9001',
  
});


const client =new ApolloClient({
  link:httpsLink,
  cache,
})


ReactDOM.render(
  // <ApolloProvider client={client}>
  <Provider store ={Store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  {/* // </ApolloProvider> */}
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
