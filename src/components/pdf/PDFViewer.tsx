import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaTimes } from 'react-icons/fa';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function PDFViewer({ isOpen, setIsOpen, pdfUrl, project }) {

	const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const getPublicUrl = (url: string) => {
	const baseUrl = process.env.REACT_APP_BASENAME || '';
	return `${window.location.origin}${baseUrl}/sheets/${project}/${url}`;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToPrevPage() {
    setPageNumber(pageNumber - 1);
  }

  function goToNextPage() {
    setPageNumber(pageNumber + 1);
  }

  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = pdfUrl.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full p-4 max-w-xl transform overflow-hidden bg-base-100 text-base-content text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-2">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                    PDF Viewer
                  </Dialog.Title>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-base-300 px-4 py-2 text-sm font-medium text-base-content hover:border bg-border-base focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    <FaTimes />
                  </button>
                </div>
	
                {pdfUrl && (
                  <div>
                    <Document
                      file={pdfUrl.includes("https://") ? pdfUrl : getPublicUrl(pdfUrl)}
                      onLoadSuccess={onDocumentLoadSuccess}
                      className="max-h-[80vh] overflow-auto"
                    >
						
                        <Page 
							pageNumber={pageNumber} 
							width={Math.min(550, (document?.querySelector('.w-full') as HTMLElement)?.offsetWidth - 20 || 550)} 
						/>
                    </Document>
                    <div className="flex justify-between gap-3 items-center mt-2">
					
                      <button
                        disabled={pageNumber <= 1}
                        onClick={goToPrevPage}
                        className="px-4 py-2 bg-base-300 border bg-border-base text-base-content rounded disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span>
                        Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                      </span>
                      <button
                        disabled={pageNumber >= numPages}
                        onClick={goToNextPage}
                        className="px-4 py-2 bg-base-300 text-base-content border bg-border-base rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex w-full justify-between">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={downloadPdf}
                  >
                    Download
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PDFViewer;