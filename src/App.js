import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sheet from './pages/Sheet';
import RootLayout from './layout';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sheet" element={<Sheet />} />
        </Routes>
      </RootLayout>
    </ToastProvider>
  );
}

export default App;