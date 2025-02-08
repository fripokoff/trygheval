import { createContext, useContext, useState } from 'react';

const AttachmentContext = createContext();

export function AttachmentProvider({ children }) {
  const [attachments, setAttachments] = useState([]);

  const [numberOfAttachments, setNumberOfAttachments] = useState(0);

  const value = {
    attachments,
    setAttachments,
    numberOfAttachments,
    setNumberOfAttachments
  };

  return (
    <AttachmentContext.Provider value={value}>
      {children}
    </AttachmentContext.Provider>
  );
}

export const useAttachmentContext = () => {
  const context = useContext(AttachmentContext);
  if (!context) {
    throw new Error('useAttachmentContext must be used within an AttachmentProvider');
  }
  return context;
};