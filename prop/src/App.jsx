import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EditUser from './pages/EditUser';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>User Management System</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId/edit" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
