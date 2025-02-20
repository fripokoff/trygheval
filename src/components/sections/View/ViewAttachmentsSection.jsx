import React, { useState } from 'react';
import PDFViewer from '../../pdf/PDFViewer';

function ViewAttachmentsSection({ sheetData, isNotExam }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);

  function openModal(url) {
    if(url === '/Extras')
    {
      return null;
    }
    setSelectedPdfUrl(url);
    setIsOpen(true);
  }
  if(sheetData.attachments && sheetData.attachments.length > 0)
  {
    
    return (
      <div className='mt-10 bg-base-100 p-5 lg:p-10 rounded-lg' id="attachments">
        <h2 className='text-2xl font-bold'>Attachments</h2>
        <p className='pt-2 pb-5'>Please download the attachments below:</p>
  
        <div className='pt-5'>
          {sheetData.attachments && sheetData.attachments.map((attachment, index) => (
            <div key={index} id={`attachment_${index + 1}`}>
              <button
                onClick={() => openModal(attachment.url)}
                className='text-xl font-medium text-sky-500 rounded-lg mb-2 flex gap-2 items-center'
              >
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                  </svg>
                </span>
                {attachment.title}
              </button>
            </div>
          ))}
        </div>
  
        <PDFViewer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pdfUrl={selectedPdfUrl}
          project={sheetData.project_title}
        />
      </div>
    );
  }
}

export default ViewAttachmentsSection;