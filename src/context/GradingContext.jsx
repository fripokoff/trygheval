import { createContext, useContext, useState } from 'react';

const GradingContext = createContext();

export function GradingProvider({ children }) {
  const [gradingOptionsDataFromServer, setGradingOptionsDataFromServer] = useState([]);

  const value = {
    gradingOptionsDataFromServer,
    setGradingOptionsDataFromServer
  };

  return (
    <GradingContext.Provider value={value}>
      {children}
    </GradingContext.Provider>
  );
}

export const useGradingContext = () => useContext(GradingContext);