export default function SheetHeader({handleEdit, addMode, sheetData, handleImportData, handleDownload}) {
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
        <div className="fixed bottom-0 left-0 flex flex-col gap-2 items-center rounded-md p-4 py-3 px-3 transition">
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
            <input
              type="file"
              id="import_data"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
            <button
              onClick={() => document.getElementById('import_data').click()}
              className="w-[150px] px-6 py-3 bg-base-100 border border-base text-base-content rounded-md shadow-sm hover:bg-base-300 focus:outline-none focus:ring-2 focus:bg-base-500 focus:ring-offset-2 sm:text-sm"
            >
              Import
            </button>
          </div>
        </div>
      </>
    );
  }