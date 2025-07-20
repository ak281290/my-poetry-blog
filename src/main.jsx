import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import PoetryBlog from './PoetryBlog.jsx'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import AddPoem from './AddPoem.jsx';
import Login from './Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Signup from './Signup.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/poems"
          element={
            <ProtectedRoute>
              <PoetryBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddPoem />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)