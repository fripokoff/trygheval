import React from 'react';
import ThemeProvider from './components/theme/ThemeProvider';
import Loading from './components/loading/Loading';
import Header from './components/navigation/Header';
import Footer from './components/navigation/Footer';
import { LoadingProvider } from './contexts/LoadingContext';
import ToastContainer from './components/toast/ToastContainer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ThemeProvider>
        <LoadingProvider>
          <Loading />
          <Header />
          {children}
          
          <Footer />
        </LoadingProvider>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}