import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page from './sheets/page';
import RootLayout from './layout';

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sheets" element={<Page />} />
      </Routes>
    </RootLayout>
  );
}

export default App;