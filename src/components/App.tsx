import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './NavBar';
import { StoreProvider } from '../Store';
import './App.css';
import Routes from './Routes';

function App(): ReactElement {
  return (
    <StoreProvider>
      <>
        <ToastContainer />
        <Router>
          <NavBar />
          <Routes />
        </Router>
      </>
    </StoreProvider>
  );
}

export default App;
