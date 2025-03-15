import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './index.css';
import LoginPage from './screens/login'; 
import SignupPage from './screens/signup'; 
import HomePage from './screens/home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} /> {}
        <Route path="/register" element={<SignupPage />} /> {}
        <Route path="/home" element={<HomePage />} /> {}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
