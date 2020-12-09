import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { StoreProvider } from '../Store';
import NavBar from './NavBar';
import Routes from './Routes';
import './App.css';

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
