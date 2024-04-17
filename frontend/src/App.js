// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CGPACalculationPage from './components/CGPACalculationPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={ <LoginPage/> } />
          <Route exact path="/register" element={ <RegisterPage/> } />
          <Route exact path="/cgpa-calculation" element={ <CGPACalculationPage/> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
