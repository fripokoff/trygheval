import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { FaTimes } from 'react-icons/fa';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function ViewAttachmentsSection({ sheetData }) {
  let modifiedUrl = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  const projectParam = urlParams.get('project');
  if (projectParam ) {
    modifiedUrl = modifiedUrl.replace(/\?project=[\w_-]+(?:&edit=true)?/, `s/${projectParam}/`);
  }
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function openModal(url) {
    setSelectedPdfUrl(url);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setPageNumber(1);
  }

  function goToPrevPage() {
    setPageNumber(pageNumber - 1);
  }

  function goToNextPage() {
    setPageNumber(pageNumber + 1);
  }

  const downloadPdf = () => {
    if (selectedPdfUrl) {
      const link = document.createElement('a');
      link.href = selectedPdfUrl;
      link.download = selectedPdfUrl.split('/').pop(); // Extract filename from URL
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className='mt-10 bg-base-100 p-5 lg:p-10 rounded-lg' id="attachments">
      <h2 className='text-2xl font-bold'>
        Attachments
      </h2>
      <p className='pt-2 pb-5'>
        Please download the attachments below:
      </p>

      <div className='pt-5'>
        {sheetData.attachments && sheetData.attachments.map((attachment, index) => (
          <div
          key={index}
          id={`attachment_${index + 1}`}
          >
            <button
              onClick={() => openModal(attachment.url)}
              className='text-xl font-medium text-sky-500 rounded-lg mb-2 flex gap-2 items-center'
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                  />
                </svg>
              </span>
              {attachment.title}
            </button>
          </div>
        ))}
      </div>

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
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 "
                    >
                      PDF Viewer
                    </Dialog.Title>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-base-300 px-4 py-2 text-sm font-medium text-base-content hover:border bg-border-base  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  {selectedPdfUrl && (
                    <div>
                      <Document
                        file={selectedPdfUrl.includes("https://") ?  selectedPdfUrl : modifiedUrl + selectedPdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="max-h-[80vh] overflow-auto"
                      >
                        <Page pageNumber={pageNumber} width={Math.min(550, document.querySelector('.w-full').offsetWidth - 20)} />
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
    </div>
  );
}

export default ViewAttachmentsSection;