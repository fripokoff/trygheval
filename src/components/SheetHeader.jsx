import React, { useState } from 'react';

export default function SheetHeader({ handleEdit, addMode, sheetData, handleImportData, handleDownload }) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          handleImportData(jsonData); // Assurez-vous que handleImportData peut gérer un objet JSON directement
          closeImportModal();
        } catch (error) {
          console.error("Erreur lors de l'analyse du fichier JSON :", error);
          // Gérer l'erreur (afficher un message à l'utilisateur)
        }
      };
      reader.readAsText(file);
    }
  };

  const handleJsonImport = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      handleImportData(jsonData); // Assurez-vous que handleImportData peut gérer un objet JSON directement
      closeImportModal();
    } catch (error) {
      console.error("Erreur lors de l'analyse du JSON :", error);
      // Gérer l'erreur (afficher un message à l'utilisateur)
    }
  };

  const openImportModal = () => {
    setIsImportModalOpen(true);
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
    setJsonInput(''); // Réinitialiser l'input JSON
  };

  return (
    <>
      <div className="flex gap-3 justify-between max-w-7xl mx-auto px-3 sm:px-5 2xl:px-0 w-full pt-4">
        <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-3 gap-2 sm:gap-4 items-center w-full">
          <div className="flex justify-start">
            <a href="./">
              <div className="flex items-center bg-base-100 text-base-content p-2 sm:p-3 rounded-md transition border border-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </div>
            </a>
          </div>

          <h1 className='text-xl sm:text-2xl font-bold text-center truncate px-1'>
            {sheetData.project_title}
          </h1>

          <div className="flex justify-end">
            <button
              onClick={handleEdit}
              className="w-16 sm:w-20 bg-blue-700 hover:bg-blue-800 text-white py-2 sm:py-3 px-3 sm:px-6 rounded-md transition text-sm sm:text-base"
            >
              View
            </button>
          </div>
        </div>
      </div>
      <div className="data-buttons fixed bottom-0 left-0 flex flex-col gap-2 items-center rounded-md p-4 py-3 px-3 transition">
        <div>
          <button
            type="button"
            onClick={handleDownload}
            className="w-[150px] bg-base-100 border border-base hover:bg-base-300 text-base-content py-3 px-10 rounded transition duration-200"
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
                className="btn btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}