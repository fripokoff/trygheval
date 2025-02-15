import React, { useState, useCallback, useContext } from 'react';
import { ToastContext } from '../../contexts/ToastContext';
import NavigationViewHeader from './NavigationViewHeader';

export default function NavSheet({ handleEdit, addMode, sheetData, handleImportData, handleDownload }) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const { addToast } = useContext(ToastContext);

  const handleAddToast = ({type, msg, position}) => {
    addToast({
      type: type,
      message: msg,
      duration: 5000,
      position: position,
      dismissable: true,
      animationIn: 'slide-in-right',
      animationOut: 'slide-out-left',
      animationSpeed: 0.5,
    });
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          handleImportData(JSON.stringify(jsonData));
          closeImportModal();
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleJsonImport = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      handleImportData(JSON.stringify(jsonData));
      closeImportModal();
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  const openImportModal = () => {
    setIsImportModalOpen(true);
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
    setJsonInput('');
  };

  const openDownloadModal = () => {
    setIsDownloadModalOpen(true);
  };

  const closeDownloadModal = () => {
    setIsDownloadModalOpen(false);
  };

  const handleCopyToClipboard = useCallback(() => {
    const data = {
      "success": true,
      "data": [sheetData],
      "message": "Sheet created successfully"
    };
    
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      .then(() => {
        handleAddToast({
          type: 'success',
          msg: 'Data copied to clipboard!',
          position: 'bottom-right'
        })
        closeDownloadModal();
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }, [sheetData]);

  return (
    <>
      <div className="flex gap-3 justify-between max-w-7xl mx-auto px-3 sm:px-5 2xl:px-0 w-full pt-4">
        <NavigationViewHeader 
                handleEdit={handleEdit}
                sheetData={sheetData}
                inView={false}
                />
      </div>
      <div className="data-buttons fixed bottom-0 left-0 flex flex-col gap-2 items-center rounded-md p-4 py-3 px-3 transition">
        <div>
          <button
            type="button"
            onClick={openDownloadModal}
            className="w-[150px] bg-base-100 border border-base hover:bg-base-300 text-base-content py-3 px-10 rounded"
          >
            Download
          </button>
        </div>
        <div className="mt-2">
          <button
            onClick={openImportModal}
            className="w-[150px] px-6 py-3 bg-base-100 border border-base text-base-content rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-base-500 focus:ring-offset-2 sm:text-sm"
          >
            Import
          </button>
        </div>
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 rounded-md">
          <div className="bg-base-200 p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Import sheet</h2>

            {/* Import via File */}
            <div>
              <label htmlFor="import_data" className="block text-sm font-medium text-base-content mb-2">
                Import from JSON file:
              </label>
              <input
                type="file"
                id="import_data"
                accept=".json"
                onChange={handleFileImport}
                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              />
            </div>

            {/* Import via JSON Input */}
            <div className="mt-4">
              <label htmlFor="json_input" className="block text-sm font-medium text-base-content mb-2">
                Import from JSON input:
              </label>
              <textarea
                id="json_input"
                className="textarea textarea-bordered w-full max-w-xs h-24"
                placeholder="Paste your JSON here"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
              ></textarea>
              <button
                onClick={handleJsonImport}
                className="btn btn-base-100 border border-base-content p-4 mt-2"
              >
                Import JSON
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeImportModal}
                className="p-4 font-bold border border-base-content rounded-md bg-base-300 text-base-content"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 rounded-md">
          <div className="bg-base-200 p-6 rounded-md max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">Download sheet</h2>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-base-content mb-2">Preview:</h3>
              <pre className="bg-base-300 p-4 rounded-md overflow-auto max-h-[500px]">
                <code className="text-sm">
                  {JSON.stringify(sheetData, null, 2)}
                </code>
              </pre>
            </div>
            <button
              onClick={handleCopyToClipboard}
              className="btn bg-base-300 border border-base-content p-4 mt-2 w-full"
            >
              Copy to Clipboard
            </button>


            <button
              onClick={handleDownload}
              className="btn bg-green-500 hover:bg-green-500 text-white border border-base-content p-4 mt-2 w-full"
            >
              Download as JSON
            </button>



            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDownloadModal}
                className="p-4 font-bold border border-base-content rounded-md bg-base-300 text-base-content"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}