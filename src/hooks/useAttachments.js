import { useAttachmentContext } from '../contexts/AttachmentContext';
import { v4 as uuidv4 } from 'uuid';

export const useAttachments = () => {
  const {
    attachments,
    setAttachments,
    setNumberOfAttachments
  } = useAttachmentContext();

  const addAttachment = (title, url) => {
    const newAttachment = { 
      id: uuidv4(), 
      index: attachments.length, 
      title: title || '', 
      url: url || '' 
    };
    
    setAttachments(prev => [...prev, newAttachment]);
    setNumberOfAttachments(prev => prev + 1);
  };

  const resetAttachments = () => {
    setAttachments([]);
    setNumberOfAttachments(0);
  };

  const removeAttachment = (indexToRemove) => {
    setAttachments(prev => {
      const newAttachments = prev
        .filter((_, index) => index !== indexToRemove)
        .map((attachment, index) => ({ ...attachment, index }));
      return newAttachments;
    });
    
    setNumberOfAttachments(prev => prev - 1);
  };

  const updateAttachment = (indexToUpdate, updatedAttachment) => {
    setAttachments(prev => {
      const newAttachments = prev.map((attachment, index) => {
        if (index === indexToUpdate) {
          return { ...attachment, ...updatedAttachment };
        }
        return attachment;
      });
      return newAttachments;
    });
  };

  return {
    addAttachment,
    removeAttachment,
    updateAttachment,
    resetAttachments
  };
};