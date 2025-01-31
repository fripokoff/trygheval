import React from 'react';
import ThemeProvider from './components/ThemeProvider';
import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';
import { LoadingProvider } from './context/LoadingContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark">
      <ThemeProvider>
        <LoadingProvider>
          <Loading />
          <Header />
          {children}
          <Footer />
        </LoadingProvider>
      </ThemeProvider>
    </div>
  );
}